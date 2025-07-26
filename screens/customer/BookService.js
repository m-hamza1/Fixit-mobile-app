import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BookService = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [address, setAddress] = useState('');
  const [activeScreen, setActiveScreen] = useState('BookService');

  const onChange = (event, selectedDate) => {
    if (event?.type === 'dismissed') {
      setShowPicker(false);
      return;
    }
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  useEffect(() => {
    if (route.name === 'BookService') {
      setActiveScreen('BookService');
    } else if (route.name === 'CustomerHome') {
      setActiveScreen('CustomerHome');
    }
  }, [route.name]);

  // ✅ Function to handle booking confirmation
  const handleConfirmBooking = () => {
    Alert.alert(
      'Booking Confirmed',
      'Your booking has been successfully confirmed.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Dashboard'), // ✅ Go to Dashboard.js
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking</Text>
        </View>

        <Text style={styles.subTitle}>
          Choose your preferred time and enter your address below.
        </Text>

        {/* Booking Card */}
        <View style={styles.card}>
          <Text style={styles.providerName}>Alex Johnson</Text>
          <Text style={styles.serviceType}>Plumbing Service</Text>

          <TouchableOpacity style={styles.inputBox} onPress={() => setShowPicker(true)}>
            <Text style={styles.inputText}>
              {`Date & Time: ${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChange}
            />
          )}

          <TextInput
            style={styles.textInput}
            placeholder="Address For Service"
            placeholderTextColor="#B6C7BC"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Primary Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleConfirmBooking}>
          <Text style={styles.primaryButtonText}>Request a Service</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerHome')}>
          <Ionicons
            name="home"
            size={24}
            color={activeScreen === 'CustomerHome' ? "#2BF067" : "#A0BDA0"}
          />
        </TouchableOpacity>
        <Ionicons name="calendar-outline" size={24} color="#A0BDA0" />
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#A0BDA0" />
        <Ionicons name="person-outline" size={24} color="#A0BDA0" />
      </View>
    </SafeAreaView>
  );
};

export default BookService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subTitle: {
    color: '#B6C7BC',
    fontSize: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1A2D23',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  providerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceType: {
    color: '#B6C7BC',
    fontSize: 14,
    marginBottom: 16,
  },
  inputBox: {
    backgroundColor: '#2D4435',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  inputText: {
    color: '#A4F3C4',
    fontSize: 14,
  },
  textInput: {
    backgroundColor: '#2D4435',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#2BF067',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#0F2018',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A2D23',
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 8,
  },
});
