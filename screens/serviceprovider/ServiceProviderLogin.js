import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ServiceProviderLogin = () => {
  const navigation = useNavigation(); // ✅ This makes navigation work

  return (
    <LinearGradient
      colors={['#f5b993', '#cbe8dd']}
      style={styles.container}
    >
      <View style={styles.logoBox} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome back</Text>

        <TextInput
          placeholder="Username  or Email"
          placeholderTextColor="#A0BDA0"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#A0BDA0"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('ServiceProviderProfileStep1')}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoBox: {
    height: 220,
    marginTop: 60,
    marginBottom: 20,
    marginHorizontal: 60,
    borderWidth: 1,
    borderColor: '#ffffff88',
    borderRadius: 5,
  },
  formContainer: {
    backgroundColor: '#0F2018',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2D4435',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
  },
  forgotText: {
    color: '#A0BDA0',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#2BF067',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#0F2018',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#A0BDA0',
  },
  signupLink: {
    textDecorationLine: 'underline',
  },
});

export default ServiceProviderLogin;
