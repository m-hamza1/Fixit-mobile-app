import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const RequestDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { request, showPhone } = route.params || {};

  if (!request) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No request data found.</Text>
      </View>
    );
  }

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
});
