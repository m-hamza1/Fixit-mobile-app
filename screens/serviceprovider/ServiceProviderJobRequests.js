import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import { db, auth } from '../../utils/firebase';
import { ref, onValue } from 'firebase/database';

const ServiceProviderJobRequests = () => {
  const navigation = useNavigation(); 
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    // Listen for pending job requests from Firebase
    const user = auth.currentUser;
    if (!user) return;
    const servicesRef = ref(db, 'services');
    const unsubscribe = onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      const jobs = [];
      if (data) {
        Object.values(data).forEach((job) => {
          // Show jobs with status 'pending' and (optionally) addressed to this provider
          if (job.status === 'pending' && (!job.providerId || job.providerId === '' || job.providerId === user.uid)) {
            jobs.push(job);
          }
        });
      }
      setJobList(jobs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="white" />
        <Text style={styles.headerTitle}>Job Requests</Text>
        <View style={{ width: 24 }} /> {/* spacer */}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>New Requests</Text>
        <Text style={styles.tab}>Scheduled</Text>
        <Text style={styles.tab}>Upcoming</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#A0BDA0" />
        <TextInput
          placeholder="Search  requests"
          placeholderTextColor="#A0BDA0"
          style={styles.searchInput}
        />
      </View>

      {/* Job Cards */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {jobList.length === 0 ? (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>No new job requests.</Text>
        ) : (
          jobList.map((job, index) => (
            <View key={job.id || index} style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.newLabel}>New</Text>
                <Text style={styles.jobTitle}>{job.service}</Text>
                <Text style={styles.jobAddress}>{job.address}</Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('RequestDetailsScreen', { request: job })}>
                  <Text style={styles.viewText}>View</Text>
                </TouchableOpacity>
              </View>
              {/* Optionally show an image if available */}
              {/* <Image source={job.image} style={styles.cardImage} /> */}
            </View>
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={22} color="#A0BDA0" />
        <Ionicons name="list" size={22} color="#2BF067" />
        <Ionicons name="chatbubble" size={22} color="#A0BDA0" />
        <Ionicons name="person" size={22} color="#A0BDA0" />
      </View>
    </View>
  );
};

export default ServiceProviderJobRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    color: '#A0BDA0',
    marginRight: 20,
    paddingBottom: 6,
  },
  activeTab: {
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#2BF067',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D4435',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  searchInput: {
    marginLeft: 10,
    color: '#fff',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1A2F24',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardLeft: {
    flex: 1,
    padding: 15,
  },
  newLabel: {
    color: '#2BF067',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  jobAddress: {
    color: '#A0BDA0',
    fontSize: 13,
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: '#2D4435',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewText: {
    color: '#fff',
    fontWeight: '600',
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
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
