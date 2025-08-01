import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactProvider = ({ route, navigation }) => {
  const initialProvider = route.params?.provider || {};
  const [provider, setProvider] = useState(initialProvider);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If any key info is missing, fetch from Firebase
    if ((!provider.phone || !provider.email || !provider.address) && provider.id) {
      setLoading(true);
      const { db } = require('../../utils/firebase');
      const { ref, get } = require('firebase/database');
      const userRef = ref(db, 'users/' + provider.id);
      get(userRef).then((snap) => {
        if (snap.exists()) {
          setProvider({ ...provider, ...snap.val() });
        }
      }).finally(() => setLoading(false));
    }
  }, [provider]);

  const phone = provider.phone || '';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Provider Contact Details</Text>
      </View>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color="#2BF067" size="large" style={{ marginVertical: 20 }} />
        ) : (
          <>
            <Text style={styles.label}>Name: <Text style={styles.value}>{provider.name || 'N/A'}</Text></Text>
            <Text style={styles.label}>Phone: <Text style={styles.value}>{provider.phone || 'N/A'}</Text></Text>
            <Text style={styles.label}>Email: <Text style={styles.value}>{provider.email || 'N/A'}</Text></Text>
            <Text style={styles.label}>Address: <Text style={styles.value}>{provider.address || 'N/A'}</Text></Text>
            {provider.categories && Array.isArray(provider.categories) && (
              <Text style={styles.label}>Services: <Text style={styles.value}>{provider.categories.join(', ')}</Text></Text>
            )}
            {provider.description && (
              <Text style={styles.label}>About: <Text style={styles.value}>{provider.description}</Text></Text>
            )}
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => provider.phone && Linking.openURL(`tel:${provider.phone}`)}
            >
              <Ionicons name="call" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.callButtonText}>Call Provider</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#2BF067',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    backgroundColor: '#1A2D23',
    borderRadius: 16,
    margin: 20,
    padding: 24,
    alignItems: 'flex-start',
  },
  label: {
    color: '#A0BDA0',
    fontSize: 16,
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
    marginTop: 24,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  callButtonText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactProvider;
