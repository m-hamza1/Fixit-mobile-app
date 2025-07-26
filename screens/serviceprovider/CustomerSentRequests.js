import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyRequests = [
  {
    id: '1',
    providerName: 'Ali Electrician',
    service: 'Electrician',
    status: 'Pending',
    date: 'July 23, 2025',
  },
  {
    id: '2',
    providerName: 'Usman Plumber',
    service: 'Plumber',
    status: 'Accepted',
    date: 'July 21, 2025',
  },
  {
    id: '3',
    providerName: 'Sana Cleaner',
    service: 'Cleaner',
    status: 'Rejected',
    date: 'July 20, 2025',
  },
];

const CustomerSentRequests = () => {
  const renderRequest = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="person-circle-outline" size={26} color="#2BF067" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.providerName}>{item.providerName}</Text>
          <Text style={styles.service}>{item.service}</Text>
        </View>
      </View>

      <Text style={styles.date}>Requested on: {item.date}</Text>

      <Text
        style={[
          styles.status,
          item.status === 'Pending' && styles.pending,
          item.status === 'Accepted' && styles.accepted,
          item.status === 'Rejected' && styles.rejected,
        ]}
      >
        Status: {item.status}
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Requests to Providers</Text>
      <FlatList
        data={dummyRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

export default CustomerSentRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1A2D23',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  providerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  service: {
    color: '#B6C7BC',
    fontSize: 13,
  },
  date: {
    color: '#B6C7BC',
    fontSize: 13,
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pending: {
    color: '#FFD700',
  },
  accepted: {
    color: '#2BF067',
  },
  rejected: {
    color: '#FF4C4C',
  },
  button: {
    backgroundColor: '#2BF067',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
  },
});
