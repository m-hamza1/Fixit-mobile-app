import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const statuses = [
  'Scheduled',
  'On the Way',
  'In Progress',
  'Completed',
  'Issue Reported',
];

const ServiceProviderJobStatus = () => {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState('Scheduled');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Status</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Job Details */}
        <Text style={styles.sectionTitle}>Job Details</Text>

        <View style={styles.detailBox}>
          <Ionicons name="construct-outline" size={24} color="#2BF067" style={styles.detailIcon} />
          <View>
            <Text style={styles.detailTitle}>Plumbing Repair</Text>
            <Text style={styles.detailText}>123 Main St, Anytown</Text>
          </View>
        </View>

        <View style={styles.detailBox}>
          <Ionicons name="calendar-outline" size={24} color="#2BF067" style={styles.detailIcon} />
          <View>
            <Text style={styles.detailTitle}>Appointment Time</Text>
            <Text style={styles.detailText}>Scheduled for 2:00 PM</Text>
          </View>
        </View>

        {/* Status List */}
        <Text style={styles.sectionTitle}>Update Status</Text>

        {statuses.map((status, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.statusItem,
              selectedStatus === status && styles.statusItemActive,
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text style={styles.statusText}>{status}</Text>
            {selectedStatus === status && (
              <Ionicons name="radio-button-on" size={20} color="#2BF067" />
            )}
            {selectedStatus !== status && (
              <Ionicons name="radio-button-off" size={20} color="#A0BDA0" />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate('ServiceProviderHistory')}
        >
        <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>


 



      </ScrollView>
    </View>
  );
};

export default ServiceProviderJobStatus;

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
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },
  detailBox: {
    flexDirection: 'row',
    backgroundColor: '#1A2F24',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 12,
  },
  detailTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailText: {
    color: '#A0BDA0',
    fontSize: 13,
  },
  statusItem: {
    backgroundColor: '#1A2F24',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusItemActive: {
    borderColor: '#2BF067',
    borderWidth: 1,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2BF067',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#0F2018',
  },
});
