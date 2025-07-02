import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputComponent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ServiceProviderProfileStep1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Complete your profile</Text>
      </View>

      {/* Step Indicator */}
      <Text style={styles.stepText}>Step 1 of 5</Text>
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>

      {/* Form */}
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <TextInput
        placeholder="Full  Name"
        placeholderTextColor="#A0BDA0"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#A0BDA0"
        style={styles.input}
      />
      <TextInput
        placeholder="Phone  Number"
        placeholderTextColor="#A0BDA0"
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        placeholderTextColor="#A0BDA0"
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
      />

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('ServiceProviderJobRequests')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity> 


    </View>
  );
};

export default ServiceProviderProfileStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  stepText: {
    color: '#fff',
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#34523D',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 25,
  },
  progressBarFill: {
    width: '20%',
    height: '100%',
    backgroundColor: '#2BF067',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#2D4435',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    color: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  nextButton: {
    backgroundColor: '#2BF067',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontWeight: 'bold',
    color: '#0F2018',
  },
});
