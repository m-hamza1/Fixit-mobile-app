import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ServiceProviderSignUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Form Fields */}
      <TextInput
        placeholder="Full  Name"
        placeholderTextColor="#A0BDA0"
        style={styles.input}
      />
      <TextInput
        placeholder="Phone  Number or Email"
        placeholderTextColor="#A0BDA0"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#A0BDA0"
        secureTextEntry
        style={styles.input}
      />

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CustomerRegister')}>
        <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>



      {/* Footer Text */}
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.linkText}>Sign In</Text>
      </Text>
    </View>
  );
};

export default ServiceProviderSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    padding: 20,
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#2D4435',
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2BF067',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#0F2018',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#A0BDA0',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
