import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BookingScreen = () => {
  const navigation = useNavigation();

  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 1,
      name: 'Ethan Carter',
      service: 'Plumbing',
      time: 'Today, 10:00 AM',
      address: '123 Main Street',
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      service: 'Electrical',
      time: 'Tomorrow, 2:00 PM',
      address: '456 Park Lane',
    },
  ]);

  const [pastBookings] = useState([
    { id: 3, name: 'Noah Thompson', service: 'Cleaning', time: '2 days ago' },
    { id: 4, name: 'Sophia Clark', service: 'Handyman', time: '1 week ago' },
    { id: 5, name: 'Liam Walker', service: 'Painting', time: '2 weeks ago' },
  ]);

  const handleCancel = (id) => {
    Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
      {
        text: 'Yes',
        onPress: () => {
          setUpcomingBookings((prev) => prev.filter((item) => item.id !== id));
        },
      },
      { text: 'No' },
    ]);
  };

  const handleUpdate = (booking) => {
    navigation.navigate('UpdateBooking', { booking });
  };

  return (
    <View style={styles.outerContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>My Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        {upcomingBookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="calendar-clock" size={22} color="#2BF067" />
              <Text style={styles.cardTitle}>{booking.service}</Text>
            </View>
            <Text style={styles.name}>{booking.name}</Text>
            <Text style={styles.time}>{booking.time}</Text>
            <Text style={styles.address}>{booking.address}</Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleUpdate(booking)}
              >
                <Text style={styles.actionText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(booking.id)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Past</Text>
        {pastBookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="clock-outline" size={22} color="#A0BDA0" />
              <Text style={styles.cardTitle}>{booking.service}</Text>
            </View>
            <Text style={styles.name}>{booking.name}</Text>
            <Text style={styles.time}>{booking.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerHome')}>
          <Ionicons name="home-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="calendar" size={24} color="#2BF067" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPostedServices')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerAccount')}>
          <Ionicons name="person-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1A2D23',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  cardTitle: {
    color: '#2BF067',
    fontSize: 16,
    fontWeight: '600',
  },
  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  time: {
    color: '#B6C7BC',
    fontSize: 13,
    marginBottom: 2,
  },
  address: {
    color: '#8FA89B',
    fontSize: 12,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  updateButton: {
    backgroundColor: '#2BF06733',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#FF4D4D33',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    borderBottomColor: '#2D4435',
    borderBottomWidth: 1,
    marginVertical: 25,
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
