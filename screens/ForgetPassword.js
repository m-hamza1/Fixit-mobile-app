import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { ref, get } from 'firebase/database';

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setModalMsg('');
    setModalVisible(false);

    if (!email.trim()) {
      setModalMsg('Please enter your registered email.');
      setModalVisible(true);
      return;
    }

    if (!validateEmail(email.trim())) {
      setModalMsg('Please enter a valid email address.');
      setModalVisible(true);
      return;
    }

    setLoading(true);

    // Check if email exists in Realtime Database
    let emailFound = false;
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const users = snapshot.val();
        for (const key in users) {
          if (users[key].email && users[key].email.toLowerCase() === email.trim().toLowerCase()) {
            emailFound = true;
            break;
          }
        }
      }
    } catch (err) {
      setModalMsg('Something went wrong. Please try again.');
      setModalVisible(true);
      setLoading(false);
      return;
    }

    if (!emailFound) {
      setModalMsg('Please enter your registered email.');
      setModalVisible(true);
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setModalMsg('Reset link sent! Please check your Gmail to reset your password.');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setModalMsg('This email is not registered.');
      } else if (err.code === 'auth/invalid-email') {
        setModalMsg('Invalid email address.');
      } else {
        setModalMsg('Something went wrong. Please try again.');
      }
    }

    setModalVisible(true);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your registered email to receive a password reset link.
      </Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSendCode}
        disabled={loading}
      >
        <Ionicons name="mail-outline" size={20} color="#000" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>
          {loading ? 'Sending...' : 'Send Reset Email'}
        </Text>
      </TouchableOpacity>

      {/* Alert Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Notice</Text>
            <Text style={styles.modalMessage}>{modalMsg}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#B6C7BC',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#B6C7BC',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1A2D23',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 30,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#2BF067',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#2BF067',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2BF067',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  modalButtonText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
