// screens/AskRole.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const AskRole = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Role</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CustomerRegister')}
        >
          <MaterialIcons name="person" size={40} color="#2BF067" />
          <Text style={styles.cardTitle}>I am a Customer</Text>
          <Text style={styles.cardText}>I want to book services</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ProviderRegister')}
        >
          <MaterialIcons name="build" size={40} color="#2BF067" />
          <Text style={styles.cardTitle}>I am a Service Provider</Text>
          <Text style={styles.cardText}>I want to offer services</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginPrompt}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtitle}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  );
};

export default AskRole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1A2D23',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    color: '#2BF067',
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#A0BDA0',
    textAlign: 'center',
    marginTop: 5,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginPrompt: {
    fontSize: 14,
    color: '#A0BDA0',
  },
  loginLink: {
    color: '#A0BDA0',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 12,
    color: '#A0BDA0',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
