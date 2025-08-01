// screens/ProviderRegister.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const categories = [
  'Plumber',
  'Electrician',
  'Cleaner',
  'Painter',
  'Handyman',
  'Gardener',
  'Carpenter',
  'AC Technician',
  'Appliance Repair',
  'Welder',
  'Mason',
  'Roofer',
  'Glass Fitter',
  'Locksmith',
  'Pest Control',
  'Water Tank Cleaning',
  'CCTV Installer',
  'Internet Technician',
  'Other',
];

const ProviderRegister = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '', selectedCategories: []
  });

  const toggleCategory = (category) => {
    const exists = form.selectedCategories.includes(category);
    setForm((prev) => ({
      ...prev,
      selectedCategories: exists
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const handleRegister = async () => {
    const { name, phone, email, password, selectedCategories } = form;
    if (!name || !phone || !email || !password || selectedCategories.length === 0) {
      alert('Please fill all fields and select at least one category.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await set(ref(db, 'users/' + userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        phone,
        email,
        role: 'provider',
        categories: selectedCategories,
        createdAt: new Date().toISOString(),
      });

      navigation.navigate('ProviderHomeScreen');
    } catch (err) {
      console.log(err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Provider Registration</Text>
          <View style={{ width: 24 }} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#A0BDA0"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#A0BDA0"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0BDA0"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0BDA0"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />

        <Text style={styles.label}>Select Services You Provide:</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((cat) => {
            const isSelected = form.selectedCategories.includes(cat);
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryBtn, isSelected && { backgroundColor: '#2BF06733' }]}
                onPress={() => toggleCategory(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProviderRegister;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingTop: 55,
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#2D4435',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginVertical: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  categoryBtn: {
    backgroundColor: '#1A2D23',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  registerBtn: {
    backgroundColor: '#2BF067',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  registerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F2018',
  },
});
