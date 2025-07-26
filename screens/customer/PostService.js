import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const PostService = () => {
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const predefinedCategories = [
    'Electrician',
    'Plumber',
    'Cleaner',
    'Painter',
    'Carpenter',
    'Other',
  ];

  const handlePost = () => {
    const finalCategory = category === 'Other' ? customCategory : category;

    if (!finalCategory || !address || !phone || !date || !time) {
      alert('Please fill in all fields.');
      return;
    }

    alert(`Service Posted: ${finalCategory}`);
  };

  const handlePostAndNavigate = () => {
    const finalCategory = category === 'Other' ? customCategory : category;

    if (!finalCategory || !address || !phone || !date || !time) {
      alert('Please fill in all fields.');
      return;
    }

    alert(`Service Posted: ${finalCategory}`);
    navigation.navigate('MyPostedServices');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Post a Service Request</Text>

      <Text style={styles.label}>Service Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          dropdownIconColor="#2BF067"
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" color="#aaa" />
          {predefinedCategories.map((cat, index) => (
            <Picker.Item label={cat} value={cat} key={index} />
          ))}
        </Picker>
      </View>

      {/* Custom category input if "Other" selected */}
      {category === 'Other' && (
        <>
          <Text style={styles.label}>Enter Custom Category</Text>
          <TextInput
            placeholder="e.g. Roofer"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={customCategory}
            onChangeText={setCustomCategory}
          />
        </>
      )}

      <Text style={styles.label}>Address</Text>
      <TextInput
        placeholder="Your address"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="03001234567"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Preferred Date</Text>
      <TextInput
        placeholder="e.g. 2025-07-28"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Preferred Time</Text>
      <TextInput
        placeholder="e.g. 3:00 PM"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.button} onPress={handlePostAndNavigate}>
        <Ionicons name="checkmark-circle" size={20} color="#000" />
        <Text style={styles.buttonText}>Post Service</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#A0BDA0',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#1A2D23',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
  },
  pickerWrapper: {
    backgroundColor: '#1A2D23',
    borderRadius: 10,
    marginBottom: Platform.OS === 'android' ? -10 : 0,
  },
  picker: {
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: 50,
  },
  button: {
    backgroundColor: '#2BF067',
    marginTop: 30,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
