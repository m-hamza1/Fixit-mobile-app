import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { db } from '../../utils/firebase';

const RequestDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { request, showPhone } = route.params || {};
  const [loading, setLoading] = useState(false);

  if (!request) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No request data found.</Text>
      </View>
    );
  }

  const handleAccept = async () => {
    setLoading(true);
    try {
      // Get current provider info from Firebase Auth
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'Provider not logged in.');
        setLoading(false);
        return;
      }
      const providerId = user.uid;
      const providerName = user.displayName || user.email || 'Provider';

      // Update the service in Firebase with provider info and status 'scheduled'
      await set(ref(db, `services/${request.id}`), {
        ...request,
        providerId,
        providerName,
        providerPhone: user.phoneNumber || '',
        status: 'scheduled',
      });

      // Send notification to customer in Firebase (use serviceId)
      const notificationsRef = ref(db, `notifications/${request.customerId}`);
      const newNotificationRef = push(notificationsRef);
      await set(newNotificationRef, {
        type: 'provider_accept',
        message: `Provider wants to accept your service: ${request.service}`,
        providerId,
        providerName,
        serviceId: request.id,
        timestamp: Date.now(),
        status: 'pending',
      });
      Alert.alert('Success', 'Customer has been notified.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to send notification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Details</Text>
        <View style={{ width: 24 }} />
      </View>


      {/* Always show the name of the user who posted the service (from customerName) */}
      <Text style={styles.label}>Posted By:</Text>
      <Text style={styles.text}>{request.customerName || 'N/A'}</Text>

      <Text style={styles.label}>Customer:</Text>
      <Text style={styles.text}>{request.customerName}</Text>

      <Text style={styles.label}>Service:</Text>
      <Text style={styles.text}>{request.service}</Text>

      <Text style={styles.label}>Time:</Text>
      <Text style={styles.text}>{request.time}</Text>

      <Text style={styles.label}>Address:</Text>
      <Text style={styles.text}>{request.address}</Text>

      <Text style={styles.label}>Note:</Text>
      <Text style={styles.text}>{request.note}</Text>

      {showPhone && (
        <>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.text}>{request.customerPhone}</Text>
        </>
      )}

      {/* Accept Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAccept}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.acceptButtonText}>Accept</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2018', padding: 20, paddingTop: 60 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  label: { color: '#2BF067', marginTop: 15, fontWeight: '600' },
  text: { color: '#fff', fontSize: 16 },
  noData: { color: '#ccc', textAlign: 'center', marginTop: 100, fontSize: 18 },
  buttonContainer: { marginTop: 40, alignItems: 'center' },
  acceptButton: {
    backgroundColor: '#2BF067',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  acceptButtonText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
