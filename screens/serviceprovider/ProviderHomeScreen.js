import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProviderHomeScreen = () => {
  const navigation = useNavigation();

  const upcomingJobs = [
    {
      id: 1,
      customer: 'Ali Raza',
      service: 'Electrician',
      date: 'Tomorrow, 10:00 AM',
    },
  ];

  const previousJobs = [
    {
      id: 2,
      customer: 'Sana Malik',
      service: 'Plumber',
      date: '2 days ago',
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Provider Home</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Main Content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Upcoming Jobs */}
          <Text style={styles.sectionTitle}>Upcoming Jobs</Text>
          {upcomingJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <Text style={styles.jobText}>{job.service}</Text>
              <Text style={styles.jobSub}>
                {job.customer} - {job.date}
              </Text>
            </View>
          ))}

          {/* Previous Jobs */}
          <Text style={styles.sectionTitle}>Previous Jobs</Text>
          {previousJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <Text style={styles.jobText}>{job.service}</Text>
              <Text style={styles.jobSub}>
                {job.customer} - {job.date}
              </Text>
            </View>
          ))}

          {/* View All Service Requests */}
          <TouchableOpacity
            style={styles.allRequestsCard}
            onPress={() => navigation.navigate('ProviderDashboard')}
          >
            <Text style={styles.cardTitle}>View All Service Requests</Text>
            <Ionicons name="chevron-forward" size={20} color="#2BF067" />
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderHomeScreen')}>
            <Ionicons name="home" size={24} color="#2BF067" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderSentRequests')}>
            <Ionicons name="calendar-outline" size={24} color="#A0BDA0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderChat')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#A0BDA0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderAccountScreen')}>
            <Ionicons name="person-outline" size={24} color="#A0BDA0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProviderHomeScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingTop: 55,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    flexGrow: 1,
    backgroundColor: '#0F2018',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#2BF067',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  jobCard: {
    backgroundColor: '#1A2D23',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  jobText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  jobSub: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 4,
  },
  allRequestsCard: {
    backgroundColor: '#1A2D23',
    borderRadius: 12,
    padding: 16,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#2BF067',
    fontSize: 16,
    fontWeight: '600',
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
