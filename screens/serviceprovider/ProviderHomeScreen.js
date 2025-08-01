import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../../utils/firebase';
import { ref, onValue } from 'firebase/database';

const ProviderHomeScreen = () => {
  const navigation = useNavigation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [scheduledJobs, setScheduledJobs] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const notifRef = ref(db, `notifications/${user.uid}`);
    const unsubscribe = onValue(notifRef, (snapshot) => {
      let count = 0;
      snapshot.forEach((child) => {
        if (!child.val().read) count++;
      });
      setUnreadCount(count);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const jobsRef = ref(db, 'services');
    const unsubscribe = onValue(jobsRef, async (snapshot) => {
      const pending = [];
      const scheduled = [];
      const userPromises = [];
      const scheduledRaw = [];

      snapshot.forEach((child) => {
        const data = child.val();
        if (data.providerId === user.uid && data.status === 'pending') {
          pending.push({
            id: child.key,
            customer: data.customerName || 'Customer',
            service: data.category || '',
            date: data.date || '',
          });
        }
        if (data.providerId === user.uid && data.status === 'scheduled') {
          scheduledRaw.push({
            ...data,
            id: child.key,
          });
        }
      });

      for (const job of scheduledRaw) {
        if (job.customerId) {
          userPromises.push(
            import('firebase/database').then(({ get, ref }) =>
              get(ref(db, `users/${job.customerId}`)).then((snap) => ({
                job,
                customer: snap.exists() ? snap.val() : null,
              }))
            )
          );
        } else {
          scheduled.push({
            id: job.id,
            customer: job.customerName || 'Customer',
            service: job.category || '',
            date: job.date || '',
            phone: '',
          });
        }
      }

      const results = await Promise.all(userPromises);
      for (const { job, customer } of results) {
        scheduled.push({
          id: job.id,
          customer: customer?.name || job.customerName || 'Customer',
          service: job.category || '',
          date: job.date || '',
          phone: customer?.phone || '',
        });
      }

      setPendingJobs(pending);
      setScheduledJobs(scheduled);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Provider Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderNotifications')} style={{ position: 'relative' }}>
            <Ionicons name="notifications-outline" size={24} color="#2BF067" />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Pending Jobs</Text>
          {pendingJobs.length === 0 ? (
            <Text style={styles.jobSub}>No pending jobs.</Text>
          ) : (
            pendingJobs.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <Text style={styles.jobText}>{job.service}</Text>
                <Text style={styles.jobSub}>{job.customer} - {job.date}</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => navigation.navigate('JobDetailsScreen', { jobId: job.id })}
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          <Text style={styles.sectionTitle}>Scheduled Jobs</Text>
          {scheduledJobs.length === 0 ? (
            <Text style={styles.jobSub}>No scheduled jobs.</Text>
          ) : (
            scheduledJobs.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <Text style={styles.jobText}>{job.service}</Text>
                <Text style={styles.jobSub}>{job.customer} - {job.date}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => navigation.navigate('JobDetailsScreen', { jobId: job.id })}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <TouchableOpacity
            style={styles.allRequestsCard}
            onPress={() => navigation.navigate('ProviderDashboard')}
          >
            <Text style={styles.cardTitle}>View All Service Requests</Text>
            <Ionicons name="chevron-forward" size={20} color="#2BF067" />
          </TouchableOpacity>
        </ScrollView>

        {/* Fixed Bottom Navigation */}
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
    </SafeAreaView>
  );
};

export default ProviderHomeScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0F2018',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  scrollContainer: {
    paddingBottom: 130,
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
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
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
  detailsButton: {
    backgroundColor: '#2BF067',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 14,
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
