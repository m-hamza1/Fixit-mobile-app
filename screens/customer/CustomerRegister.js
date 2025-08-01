import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const CustomerRegister = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    if (!name || !phone || !address) {
      setError('All fields are required');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Store additional info in Firestore
      await set(ref(db, 'users/' + userCredential.user.uid), {
        name,
        email,
        phone,
        address,
        role: 'customer',
        createdAt: new Date().toISOString(),
      });
      setSuccess('Registration Successfully!');
      setTimeout(() => {
        setSuccess('');
        navigation.navigate('CustomerHome');
      }, 1500);
    } catch (err) {
      // Firebase error handling
      let msg = 'Registration failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please log in or use another email.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Invalid email address.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/network-request-failed') {
        msg = 'Network error. Please check your connection.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Too many attempts. Please try again later.';
      }
      setError(msg);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerText}>Customer Registration</Text>

        {/* Form Card */}
        <View style={styles.formCard}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#A0BDA0"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A0BDA0"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#A0BDA0"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#A0BDA0"
            style={[styles.input, styles.textArea]}
            multiline
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A0BDA0"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
          {success ? <Text style={{ color: 'green', marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>{success}</Text> : null}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRegister}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Log In
          </Text>
        </Text>

        <Text style={styles.termsText}>
          By registering, you agree to our Terms & Conditions and Privacy Policy.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomerRegister;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0F2018',
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  headerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 25,
  },
  formCard: {
    backgroundColor: '#1A2D23',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    backgroundColor: '#2D4435',
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2BF067',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F2018',
  },
  loginText: {
    color: '#A0BDA0',
    marginTop: 25,
    alignSelf: 'center',
    fontSize: 14,
  },
  loginLink: {
    textDecorationLine: 'underline',
    color: '#A0BDA0',
    fontWeight: '600',
  },
  termsText: {
    color: '#4E6E5B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
});
