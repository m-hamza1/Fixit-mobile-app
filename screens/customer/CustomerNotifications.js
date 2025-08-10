import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../../utils/firebase';
import { ref, onValue, update, get } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

const CustomerNotifications = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const notifRef = ref(db, `notifications/${user.uid}`);
    const unsubscribe = onValue(notifRef, (snapshot) => {
      const notifs = [];
      snapshot.forEach((child) => {
        notifs.push({ id: child.key, ...child.val() });
      });
      setNotifications(notifs.reverse());
    });
    return () => unsubscribe();
  }, [user]);

  const handleAcceptProvider = async (notif) => {
    try {
      // Mark notification as accepted and scheduled for customer
      await update(ref(db, `notifications/${user.uid}/${notif.id}`), { accepted: true, status: 'scheduled' });

      // Get customer phone number
      const customerSnapshot = await get(ref(db, `users/${user.uid}`));
      let customerPhone = '';
      let customerName = '';
      if (customerSnapshot.exists()) {
        customerPhone = customerSnapshot.val().phone || '';
        customerName = customerSnapshot.val().name || '';
      }

      // Also mark the service as scheduled in the main services list and save customer phone
      await update(ref(db, `services/${notif.serviceId}`), {
        status: 'scheduled',
        customerPhone,
        customerName,
      });

      // Get provider phone number
      const providerSnapshot = await get(ref(db, `users/${notif.providerId}`));
      let providerPhone = '';
      if (providerSnapshot.exists()) {
        providerPhone = providerSnapshot.val().phone || '';
      }

      // Send notification to provider with customer phone and scheduled status
      const providerNotifRef = ref(db, `notifications/${notif.providerId}`);
      if (customerSnapshot.exists()) {
        const newNotif = {
          type: 'customer_accept',
          customerId: user.uid,
          customerName,
          customerPhone,
          providerPhone,
          serviceId: notif.serviceId,
          category: notif.category,
          address: notif.address,
          date: notif.date,
          time: notif.time,
          createdAt: Date.now(),
          read: false,
          status: 'scheduled',
        };
        await update(providerNotifRef, { [notif.id]: newNotif });
      }

      // Remove the pending notification from provider's notifications
      await update(ref(db, `notifications/${notif.providerId}/${notif.id}`), { status: 'scheduled', customerPhone });

      Alert.alert('Accepted', 'Provider will see your phone number.');
    } catch (err) {
      Alert.alert('Error', 'Could not accept provider.');
    }
  };

  const renderNotification = ({ item }) => {

    if (item.type === 'provider_accept') {
      if (item.status === 'scheduled' && item.providerPhone) {
        return (
          <View style={[styles.notifCard, !item.read && styles.unread]}>
            <Text style={styles.notifText}>
              Booking confirmed! You can now contact your provider.
            </Text>
            <Text style={styles.notifSubText}>Provider Phone: {item.providerPhone}</Text>
            <Text style={styles.notifSubText}>{item.category} at {item.address}</Text>
            <Text style={styles.notifSubText}>{`${item.date} • ${item.time}`}</Text>
            <Text style={styles.notifTime}>{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</Text>
          </View>
        );
      } else {
        // Pending acceptance
        return (
          <View style={[styles.notifCard, !item.read && styles.unread]}>
            <Text style={styles.notifText}>
              Provider wants to take your service: {item.category} at {item.address}
            </Text>
            <Text style={styles.notifSubText}>{`${item.date} • ${item.time}`}</Text>
            <Text style={styles.notifTime}>{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</Text>
            <Text style={styles.notifSubText}>Waiting for provider to accept...</Text>
          </View>
        );
      }
    }

    // Default fallback
    return (
      <View style={[styles.notifCard, !item.read && styles.unread]}>
        <Text style={styles.notifText}>New notification</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<Text style={styles.empty}>No notifications</Text>}
      />
    </View>
  );
};

export default CustomerNotifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerTitle: {
    color: '#2BF067',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notifCard: {
    backgroundColor: '#1A2D23',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
  },
  unread: {
    borderWidth: 2,
    borderColor: '#2BF067',
  },
  notifText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notifSubText: {
    color: '#A0BDA0',
    fontSize: 13,
    marginBottom: 6,
  },
  notifTime: {
    color: '#A0BDA0',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#2BF067',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 14,
  },
  empty: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 50,
  },
});
