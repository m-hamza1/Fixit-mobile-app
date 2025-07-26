import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EnterVerificationCode = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

const handleVerify = () => {
    // Verify the code logic here
    alert('Code verified. You can now reset your password.');
    // Navigate to Login screen after verification
    navigation.navigate('Login');
};

return (
    <View style={styles.container}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>We’ve sent a 4-digit code to your email</Text>

        <Text style={styles.label}>Verification Code</Text>
        <TextInput
            placeholder="e.g. 1234"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            maxLength={4}
            style={styles.input}
            value={code}
            onChangeText={setCode}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Ionicons name="checkmark-done-outline" size={20} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
        
    </View>
);
};

export default EnterVerificationCode;

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
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 8,
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
