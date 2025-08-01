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
import { ref, onValue, update, set, push, get } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

const ProviderNotifications = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const user = auth.currentUser;
  // Only show notifications that are not accepted (pending go to home)
  const visibleNotifications = notifications.filter(n => !n.accepted);

  useEffect(() => {
    if (!user) return;
    const notifRef = ref(db, `notifications/${user.uid}`);
    const unsubscribe = onValue(notifRef, (snapshot) => {
      const notifs = [];
      snapshot.forEach((child) => {
        const notif = { id: child.key, ...child.val() };
        // Only show notifications that are not scheduled or completed
        if (notif.status !== 'scheduled' && notif.status !== 'completed') {
          notifs.push(notif);
        }
      });
      setNotifications(notifs.reverse());
    });
    return () => unsubscribe();
  }, [user]);

  const handleView = (notif) => {
    update(ref(db, `notifications/${user.uid}/${notif.id}`), { read: true });
    navigation.navigate('RequestDetailsScreen', { request: notif, showPhone: false });
  };

  const handleAccept = async (notif) => {
    try {
      // Mark notification as accepted for provider
      await update(ref(db, `notifications/${user.uid}/${notif.id}`), { accepted: true });

      // Fetch the service details to ensure all fields are present
      const serviceRef = ref(db, `services/${notif.serviceId}`);
      let serviceData = {};
      let customerPhone = '';
      try {
        const snap = await get(serviceRef);
        if (snap.exists()) {
          serviceData = snap.val();
        }
        // Get customer phone
        if (serviceData.customerId) {
          const customerSnap = await get(ref(db, `users/${serviceData.customerId}`));
          if (customerSnap.exists()) {
            customerPhone = customerSnap.val().phone || '';
          }
        }
      } catch {}

      // Mark the service as scheduled for this provider
      await update(serviceRef, {
        status: 'scheduled',
        providerId: user.uid,
        customerName: serviceData.customerName || notif.customerName || '',
        category: serviceData.category || notif.category || '',
        address: serviceData.address || notif.address || '',
        date: serviceData.date || notif.date || '',
        time: serviceData.time || notif.time || '',
        providerPhone: user.phoneNumber || '',
        customerPhone,
      });

      // Send notification to customer (always create a new notification)
      const customerNotifRef = ref(db, `notifications/${serviceData.customerId || notif.customerId}`);
      const newNotificationRef = push(customerNotifRef);
      const newNotif = {
        type: 'provider_accept',
        providerId: user.uid,
        providerName: notif.providerName || '',
        providerPhone: user.phoneNumber || '',
        serviceId: notif.serviceId,
        category: notif.category || '',
        address: notif.address || '',
        date: notif.date || '',
        time: notif.time || '',
        createdAt: Date.now(),
        read: false,
        status: 'scheduled',
      };
      await set(newNotificationRef, newNotif);

      Alert.alert('Accepted', `Customer will be notified. Sent to: ${serviceData.customerId || notif.customerId}`);
    } catch (err) {
      Alert.alert('Error', 'Could not accept request.');
    }
  };

  const renderNotification = ({ item }) => (
    typeof item === 'object' && item !== null ? (
      <View style={[styles.notifCard, !item.read && styles.unread]}>
        <Text style={styles.notifText}>
          {`New service posted: ${String(item.category || '')} at ${String(item.address || '')}`}
        </Text>
        <Text style={styles.notifSubText}>
          {`${String(item.date || '')} • ${String(item.time || '')}`}
        </Text>
        <Text style={styles.notifTime}>
          {item.createdAt ? String(new Date(item.createdAt).toLocaleString()) : ''}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleView(item)}>
            <Text style={styles.buttonText}>View Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2BF067' }]}
            onPress={() => handleAccept(item)}
          >
            <Text style={[styles.buttonText, { color: '#0F2018' }]}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <Text style={styles.empty}>Invalid notification data</Text>
    )
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} /> {/* For alignment */}
      </View>

      {/* Notification List */}
      <FlatList
        data={visibleNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<Text style={styles.empty}>No notifications</Text>}
      />
    </View>
  );
};

export default ProviderNotifications;

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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#1A2D23',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#2BF067',
  },
  buttonText: {
    color: '#2BF067',
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
