import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProviderDashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCategories = [] } = route.params || {};

  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all customer posted services from Firebase
    const fetchServices = async () => {
      try {
        const { db } = require('../../utils/firebase');
        const { ref, onValue } = require('firebase/database');
        const servicesRef = ref(db, 'services');
        onValue(servicesRef, (snapshot) => {
          const services = [];
          snapshot.forEach((child) => {
            const data = child.val();
            services.push({
              id: child.key,
              customerName: data.customerName || 'Customer',
              service: data.category || '',
              time: data.time || '',
              address: data.address || '',
              note: data.note || '',
              // phone intentionally omitted
            });
          });
          // Set all requests to state
          setAllRequests(services);
        });
      } catch (err) {
        setAllRequests([]);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = allRequests;
    if (selectedCategories?.length > 0) {
      filtered = filtered.filter((req) =>
        selectedCategories.includes(req.service)
      );
    }
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(
        (req) =>
          req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredRequests(filtered);
  }, [allRequests, selectedCategories, searchQuery]);

  // Replace Accept/Decline logic with direct navigation
  const handleAccept = (request) => {
    navigation.navigate('RequestDetailsScreen', {
      request,
      showPhone: false, // Don't show phone on details screen until customer accepts
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Provider Dashboard</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services or names..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Requests */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredRequests.length === 0 ? (
          <Text style={styles.noRequest}>No matching requests found.</Text>
        ) : (
          filteredRequests.map((req) => (
            <View key={req.id} style={styles.card}>
              <Text style={styles.name}>{req.customerName}</Text>
              <Text style={styles.service}>{req.service}</Text>
              <Text style={styles.time}>{req.time}</Text>
              <Text style={styles.address}>{req.address}</Text>
              <Text style={styles.note}>{req.note}</Text>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => handleAccept(req)}
                >
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ProviderDashboard;

// Styles (same as before)...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2018', paddingTop: 55, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row', backgroundColor: '#1A2D23', borderRadius: 12,
    paddingHorizontal: 12, alignItems: 'center', marginBottom: 15
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#fff', paddingVertical: 10, fontSize: 14 },
  scrollContent: { paddingBottom: 100 },
  card: {
    backgroundColor: '#1A2D23', borderRadius: 12,
    paddingVertical: 15, paddingHorizontal: 20, marginBottom: 15,
  },
  name: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  service: { color: '#2BF067', fontSize: 14, marginBottom: 2 },
  time: { color: '#B6C7BC', fontSize: 12 },
  address: { color: '#B6C7BC', fontSize: 12, marginTop: 2 },
  note: { color: '#A0BDA0', fontSize: 12, fontStyle: 'italic', marginTop: 4 },
  noRequest: { color: '#ccc', textAlign: 'center', marginTop: 30 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 12 },
  acceptBtn: {
    backgroundColor: '#2BF06733', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8,
  },
  declineBtn: {
    backgroundColor: '#FF4D4D33', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8,
  },
  actionText: { color: '#fff', fontSize: 13, fontWeight: '500' },
});
