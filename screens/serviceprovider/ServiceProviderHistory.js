import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const jobs = [
  {
    title: 'Leaky Faucet Repair',
    date: 'July 15, 2024',
    category: 'Plumbing',
    rating: 4.5,
    feedback: 'Quick and efficient service. Resolved the issue promptly.',
  },
  {
    title: 'Outlet Installation',
    date: 'June 22, 2024',
    category: 'Electrical',
    rating: 5.0,
    feedback: 'Excellent work! Very professional and knowledgeable.',
  },
  {
    title: 'AC Maintenance',
    date: 'May 10, 2024',
    category: 'HVAC',
    rating: 4.0,
    feedback: 'Good service, but a bit pricey. Overall satisfied.',
  },
  {
    title: 'Toilet Repair',
    date: 'April 5, 2024',
    category: 'Plumbing',
    rating: 4.8,
    feedback: 'Very friendly and did a great job fixing the toilet.',
  },
];

const ServiceProviderHistory = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service History</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filters */}
      <Text style={styles.filterLabel}>Filter</Text>
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Date ▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Rating ▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Service Type ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Past Jobs */}
      <Text style={styles.sectionTitle}>Past Jobs</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {jobs.map((job, index) => (
          <View key={index} style={styles.jobCard}>
            <View style={styles.row}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobRating}>{job.rating}</Text>
            </View>
            <Text style={styles.jobMeta}>{job.date}</Text>
            <Text style={styles.jobMeta}>{job.category}</Text>
            <Text style={styles.jobFeedback}>{job.feedback}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={22} color="#A0BDA0" />
        <Ionicons name="briefcase-outline" size={22} color="#A0BDA0" />
        <Ionicons name="refresh-circle" size={22} color="#2BF067" />
        <Ionicons name="person-outline" size={22} color="#A0BDA0" />
      </View>
    </View>
  );
};

export default ServiceProviderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#2D4435',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  filterText: {
    color: '#fff',
    fontSize: 13,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  jobCard: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#2D4435',
    paddingBottom: 15,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  jobRating: {
    color: '#2BF067',
    fontWeight: 'bold',
  },
  jobMeta: {
    color: '#A0BDA0',
    fontSize: 12,
    marginBottom: 2,
  },
  jobFeedback: {
    color: '#fff',
    marginTop: 5,
    fontSize: 13,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
