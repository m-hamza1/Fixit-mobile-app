
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function App() {
  return (
    <LinearGradient colors={['#F7B18C', '#C7EDE6']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoBox} />

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome back</Text>

          <TextInput
            placeholder="Username  or Email"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            style={styles.input}
          />

          <Text style={styles.forgotText}>Forgot password?</Text>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Don’t have an account? <Text style={{ color: '#A7F3D0' }}>Sign up</Text>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  logoBox: {
    width: 180,
    height: 240,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 40,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#0F1C16',
    width: '100%',
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 20,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#1F3A2C',
    borderRadius: 10,
    paddingHorizontal: 16,
    color: 'white',
    marginTop: 12,
  },
  forgotText: {
    alignSelf: 'flex-start',
    color: '#9CA3AF',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#4ADE80',
    borderRadius: 999,
    width: '100%',
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    color: '#042F1A',
  },
  signupText: {
    marginTop: 20,
    color: '#9CA3AF',
  },
});
