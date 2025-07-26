import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSendCode = () => {
    // You can call your backend API here to send the code
    navigation.navigate('EnterVerificationCode');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your registered email to receive a reset code</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Ionicons name="mail-outline" size={20} color="#000" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>
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
});
