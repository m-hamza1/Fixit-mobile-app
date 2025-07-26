import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const providers = [
  {
    id: '1',
    name: 'Ethan Carter',
    description: 'Expert plumber with 10+ years of experience',
  },
  {
    id: '2',
    name: 'Olivia Bennett',
    description: 'Reliable plumbing services for residential and commercial properties',
  },
  {
    id: '3',
    name: 'Noah Thompson',
    description: 'Specializing in emergency plumbing repairs',
  },
  {
    id: '4',
    name: 'Ava Harper',
    description: 'Offering comprehensive plumbing solutions',
  },
];

const ShownProviders = () => {
  const navigation = useNavigation();

  const [ratingVisible, setRatingVisible] = useState(false);
  const [priceVisible, setPriceVisible] = useState(false);
  const [availabilityVisible, setAvailabilityVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Ranked Plumbers</Text>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {/* Rating Filter */}
        <Menu
          visible={ratingVisible}
          onDismiss={() => setRatingVisible(false)}
          anchor={
            <TouchableOpacity style={styles.filterButton} onPress={() => setRatingVisible(true)}>
              <Text style={styles.filterText}>Rating</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => {}} title="4+ Stars" />
          <Menu.Item onPress={() => {}} title="3+ Stars" />
          <Menu.Item onPress={() => {}} title="All Ratings" />
        </Menu>

        {/* Price Filter */}
        <Menu
          visible={priceVisible}
          onDismiss={() => setPriceVisible(false)}
          anchor={
            <TouchableOpacity style={styles.filterButton} onPress={() => setPriceVisible(true)}>
              <Text style={styles.filterText}>Price</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => {}} title="Under ₹1000" />
          <Menu.Item onPress={() => {}} title="₹1000 - ₹5000" />
          <Menu.Item onPress={() => {}} title="Above ₹5000" />
        </Menu>

        {/* Availability Filter */}
        <Menu
          visible={availabilityVisible}
          onDismiss={() => setAvailabilityVisible(false)}
          anchor={
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setAvailabilityVisible(true)}
            >
              <Text style={styles.filterText}>Availability</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => {}} title="Morning (8 AM - 12 PM)" />
          <Menu.Item onPress={() => {}} title="Afternoon (12 PM - 5 PM)" />
          <Menu.Item onPress={() => {}} title="Evening (5 PM - 9 PM)" />
        </Menu>
      </View>

      {/* Provider List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {providers.map((plumber) => (
          <View key={plumber.id} style={styles.card}>
            <Image
              // Replace with actual image if available
              // source={require('../assets/avatar-placeholder.png')}
              style={styles.avatar}
            />
            <View style={styles.cardContent}>
              <Text style={styles.verified}>Verified</Text>
              <Text style={styles.name}>{plumber.name}</Text>
              <Text style={styles.description}>{plumber.description}</Text>

                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('ProviderProfile', { provider: plumber })}>
                  <Text style={styles.viewButtonText}>View Profile</Text>
                </TouchableOpacity>

            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShownProviders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#1A2D23',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  filterText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#1A2D23',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 14,
    backgroundColor: '#2D4435',
  },
  cardContent: {
    flex: 1,
  },
  verified: {
    color: '#A4F3C4',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: '#B6C7BC',
    fontSize: 13,
    marginVertical: 4,
  },
  viewButton: {
    marginTop: 6,
    backgroundColor: '#0D1F12',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#A4F3C4',
    fontSize: 13,
    fontWeight: '500',
  },
});
