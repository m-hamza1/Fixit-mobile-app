import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db, auth } from '../../utils/firebase';
import { ref, push, set, update, get, child } from 'firebase/database';

const PostService = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const serviceToEdit = route.params?.serviceToEdit;

  const [category, setCategory] = useState(serviceToEdit?.category || '');
  const [customCategory, setCustomCategory] = useState(
    serviceToEdit?.category === 'Other' ? serviceToEdit.category : ''
  );
  const [address, setAddress] = useState(serviceToEdit?.address || '');
  const [phone, setPhone] = useState(serviceToEdit?.phone || '');
  const [date, setDate] = useState(serviceToEdit?.date || '');
  const [time, setTime] = useState(serviceToEdit?.time || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handlePostAndNavigate = async () => {
    const finalCategory = category === 'Other' ? customCategory : category;

    if (!finalCategory || !address || !phone || !date || !time) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('User not logged in!');
        return;
      }

      if (serviceToEdit) {
        const serviceRef = ref(db, 'services/' + serviceToEdit.id);
        await update(serviceRef, {
          category: finalCategory,
          address,
          phone,
          date,
          time,
        });
        Alert.alert('Success', 'Service updated successfully.');

      } else {
        const newServiceRef = push(ref(db, 'services'));
        const serviceData = {
          userId: user.uid,
          postName: user.displayName || 'Customer',
          category: finalCategory,
          address,
          phone,
          date,
          time,
          createdAt: new Date().toISOString(),
        };
        await set(newServiceRef, serviceData);

        // Send notification to all providers
        const usersSnapshot = await get(ref(db, 'users'));
        if (usersSnapshot.exists()) {
          const users = usersSnapshot.val();
          Object.keys(users).forEach((uid) => {
            if (users[uid].role === 'provider') {
              const notifRef = push(ref(db, `notifications/${uid}`));
              set(notifRef, {
                type: 'new_service',
                serviceId: newServiceRef.key,
                category: finalCategory,
                address,
                date,
                time,
                customerName: user.displayName || 'Customer',
                createdAt: new Date().toISOString(),
                read: false,
              });
            }
          });
        }
        Alert.alert('Success', 'Service posted successfully.');
      }

      navigation.navigate('MyPostedServices');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F2018" />
      <Text style={styles.heading}>
        {serviceToEdit ? 'Edit Service' : 'Post a Service'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Service Type"
        placeholderTextColor="#ccc"
        value={category}
        onChangeText={setCategory}
      />
      {category === 'Other' && (
        <TextInput
          style={styles.input}
          placeholder="Custom Category"
          placeholderTextColor="#ccc"
          value={customCategory}
          onChangeText={setCustomCategory}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#ccc"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#ccc"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: date ? '#fff' : '#ccc' }}>
          {date ? date : 'Select Date'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const d = selectedDate;
              const formatted = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
              setDate(formatted);
            }
          }}
        />
      )}

      {/* Time Picker */}
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text style={{ color: time ? '#fff' : '#ccc' }}>
          {time ? time : 'Select Time'}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time ? new Date(`1970-01-01T${time}:00`) : new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              const t = selectedTime;
              const formatted = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0');
              setTime(formatted);
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handlePostAndNavigate}>
        <Text style={styles.buttonText}>
          {serviceToEdit ? 'Update Service' : 'Post Service'}
        </Text>
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
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1A2D23',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#2BF067',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#0F2018',
    fontSize: 16,
  },
});
