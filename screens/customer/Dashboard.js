import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
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
import { db, auth } from '../../utils/firebase';
import { ref, onValue } from 'firebase/database';

const BookingScreen = () => {
  const navigation = useNavigation();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProvider, setModalProvider] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const bookingsRef = ref(db, 'services');
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setUpcomingBookings([]);
        setPastBookings([]);
        return;
      }
      const now = new Date();
      const upcoming = [];
      const past = [];
      Object.entries(data).forEach(([id, booking]) => {
        if (booking.customerId === user.uid) {
          let bookingDate = new Date(booking.date + ' ' + booking.time);
          if (isNaN(bookingDate.getTime())) bookingDate = new Date(booking.date);
          const bookingObj = { id, ...booking };
          if (bookingDate >= now) {
            upcoming.push(bookingObj);
          } else {
            past.push(bookingObj);
          }
        }
      });
      upcoming.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
      past.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
      setUpcomingBookings(upcoming);
      setPastBookings(past);
    });
    return () => unsubscribe();
  }, []);

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

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
        {upcomingBookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="calendar-clock" size={20} color="#2BF067" />
              <Text style={styles.cardTitle}>{booking.category}</Text>
            </View>
            <Text style={styles.detailText}>{booking.date} • {booking.time}</Text>
            <Text style={styles.detailText}>Address: {booking.address}</Text>

            {booking.providerName ? (
              <>
                <Text style={styles.detailText}>Provider: {booking.providerName}</Text>
                <Text style={styles.detailText}>Phone: {booking.providerPhone}</Text>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.viewBtn]}
                  onPress={() => {
                    setModalProvider({
                      name: booking.providerName,
                      phone: booking.providerPhone,
                      email: booking.providerEmail,
                      address: booking.providerAddress,
                    });
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.pendingText}>Waiting for provider to accept...</Text>
            )}

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleUpdate(booking)}>
                <Text style={styles.actionText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.cancelBtn]} onPress={() => handleCancel(booking.id)}>
                <Text style={[styles.actionText, { color: '#FF4D4D' }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Past Bookings</Text>
        {pastBookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#A0BDA0" />
              <Text style={styles.cardTitle}>{booking.category}</Text>
            </View>
            <Text style={styles.detailText}>{booking.date} • {booking.time}</Text>
            <Text style={styles.detailText}>Provider: {booking.providerName}</Text>
            <Text style={styles.detailText}>Phone: {booking.providerPhone}</Text>
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
      {/* Provider Details Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#1A2D23', borderRadius: 18, padding: 28, width: '85%', alignItems: 'center' }}>
            <Text style={{ color: '#2BF067', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Service Provider Details</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>Name: {modalProvider?.name || 'N/A'}</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>Phone: {modalProvider?.phone || 'N/A'}</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>Email: {modalProvider?.email || 'N/A'}</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 18 }}>Address: {modalProvider?.address || 'N/A'}</Text>
            <TouchableOpacity
              style={{ backgroundColor: '#2BF067', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 32 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#0F2018', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2BF067',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1A2D23',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  detailText: {
    color: '#A0BDA0',
    fontSize: 14,
    marginBottom: 4,
  },
  pendingText: {
    color: '#FFCB66',
    fontStyle: 'italic',
    marginTop: 4,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
  },
  actionBtn: {
    backgroundColor: '#2BF06722',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  viewBtn: {
    backgroundColor: '#2BF06733',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  cancelBtn: {
    backgroundColor: '#FF4D4D22',
  },
  actionText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#2D4435',
    marginVertical: 20,
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
