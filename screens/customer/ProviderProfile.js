import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import BookProviderModal from './BookProviderModal';
import { db, auth } from '../../utils/firebase';
import { ref, push, set } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

const ProfileProvider = ({ route, navigation }) => {
  const provider = route.params?.provider || {};
  const [showBookModal, setShowBookModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBook = async ({ date, time, address, note }) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not logged in');
      const bookingRef = push(ref(db, 'services'));
      await set(bookingRef, {
        providerId: provider.id || provider.uid,
        providerName: provider.name,
        customerId: user.uid,
        customerName: user.displayName || user.email || 'Customer',
        date,
        time,
        address,
        note,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      // Send notification to provider
      const notifRef = push(ref(db, `notifications/${provider.id || provider.uid}`));
      await set(notifRef, {
        type: 'new_booking',
        customerId: user.uid,
        customerName: user.displayName || user.email || 'Customer',
        providerId: provider.id || provider.uid,
        providerName: provider.name,
        date,
        time,
        address,
        note,
        status: 'pending',
        serviceId: bookingRef.key,
        createdAt: Date.now(),
        read: false,
      });
      setShowBookModal(false);
      Alert.alert('Success', 'Booking request sent to provider.');
    } catch (err) {
      Alert.alert('Error', err.message || 'Could not book provider.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            // source={provider.avatar ? { uri: provider.avatar } : require('../../assets/avatar-placeholder.png')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{provider.name || 'Provider Name'}</Text>
          <Text style={styles.service}>{provider.categories ? provider.categories.join(', ') : ''}</Text>
          <Text style={styles.verified}>✔ Verified Provider</Text>
        </View>

        {/* About */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>{provider.description || 'No description available.'}</Text>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setShowBookModal(true)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

        {/* Contact Provider Button */}
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: '#A0BDA0', marginTop: 10 }]}
          onPress={() => navigation.navigate('ContactProvider', { provider })}
        >
          <Text style={[styles.bookButtonText, { color: '#0F2018' }]}>Contact Provider</Text>
        </TouchableOpacity>
      </ScrollView>
      <BookProviderModal
        visible={showBookModal}
        onClose={() => setShowBookModal(false)}
        onBook={handleBook}
        provider={provider}
      />
    </View>
  );
};

export default ProfileProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#2D4435',
    marginBottom: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  service: {
    color: '#B6C7BC',
    fontSize: 16,
    marginTop: 4,
  },
  verified: {
    color: '#A4F3C4',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
  detailsCard: {
    backgroundColor: '#1A2D23',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#2BF067',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    color: '#B6C7BC',
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: '#2BF067',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 30,
  },
  bookButtonText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
