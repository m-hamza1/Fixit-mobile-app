import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';

const ServiceProviderProfile = () => {
  return (
    <LinearGradient colors={["#FF9A8B", "#FF6A88", "#FF99AC"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton}>{'<'} Back</Text>
        <Text style={styles.headerText}>Complete your profile</Text>
      </View>
      <Text style={styles.stepText}>Step 1 of 5</Text>
      <ProgressBar progress={0.2} color="#32CD32" style={styles.progressBar} />
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#4F4F4F" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#4F4F4F" />
      <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#4F4F4F" />
      <TextInput style={styles.textArea} placeholder="Additional Information" placeholderTextColor="#4F4F4F" multiline={true} numberOfLines={4} />
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    color: '#FFFFFF',
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepText: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#2F4F4F',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#FFFFFF',
  },
  textArea: {
    width: '100%',
    height: 100,
    backgroundColor: '#2F4F4F',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#FFFFFF',
    textAlignVertical: 'top',
  },
  nextButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#32CD32',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ServiceProviderProfile; 