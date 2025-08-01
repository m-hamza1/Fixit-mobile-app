import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { db } from '../../utils/firebase';
import { ref, get } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const JobDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { jobId } = route.params;
  const [job, setJob] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobAndCustomer = async () => {
      try {
        const jobSnap = await get(ref(db, `services/${jobId}`));
        if (jobSnap.exists()) {
          const jobData = jobSnap.val();
          setJob(jobData);
          const customerId = jobData.customerId || jobData.userId;
          if (customerId) {
            const custSnap = await get(ref(db, `users/${customerId}`));
            if (custSnap.exists()) {
              setCustomer(custSnap.val());
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    fetchJobAndCustomer();
  }, [jobId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2BF067" />
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Job not found.</Text>
      </View>
    );
  }

  const handleCall = () => {
    const phoneNumber = customer?.phone || job.customerPhone;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          Service: <Text style={styles.value}>{job.category || 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          Date: <Text style={styles.value}>{job.date || 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          Time: <Text style={styles.value}>{job.time || 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          Address: <Text style={styles.value}>{job.address || 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          Customer Name:{' '}
          <Text style={styles.value}>
            {customer?.name || job.customerName || 'N/A'}
          </Text>
        </Text>
        <Text style={styles.label}/>
          {/* Only show phone if job is scheduled */}
          {job.status === 'scheduled' ? (
            <>
              <Text style={styles.label}>
                Customer Phone:{' '}
                <Text style={styles.value}>
                  {customer?.phone || job.customerPhone || 'N/A'}
                </Text>
              </Text>
              {(customer?.phone || job.customerPhone) && (
                <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                  <Ionicons name="call" size={18} color="#0F2018" style={{ marginRight: 8 }} />
                  <Text style={styles.callButtonText}>Call Now</Text>
                </TouchableOpacity>
              )}
            </>
          ) : null}
      </View>
    </View>
  );
};


export default JobDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    color: '#2BF067',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#1A2D23',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  label: {
    color: '#A0BDA0',
    fontSize: 15,
    marginBottom: 8,
  },
  value: {
    color: '#fff',
    fontWeight: '600',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#2BF067',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  callButtonText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F2018',
  },
  errorText: {
    color: '#ccc',
    fontSize: 16,
  },
});
