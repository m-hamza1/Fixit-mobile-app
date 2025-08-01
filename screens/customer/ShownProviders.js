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

const ShownProviders = () => {
  const navigation = useNavigation();
  const route = navigation.getState().routes[navigation.getState().index];
  const selectedCategory = route.params?.category || '';

  const [ratingVisible, setRatingVisible] = useState(false);
  const [priceVisible, setPriceVisible] = useState(false);
  const [availabilityVisible, setAvailabilityVisible] = useState(false);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const { db } = require('../../utils/firebase');
    const { ref, onValue } = require('firebase/database');
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const result = [];
      snapshot.forEach((child) => {
        const data = child.val();
        if (Array.isArray(data.categories) && data.categories.includes(selectedCategory)) {
          result.push({
            id: child.key,
            name: data.name || '',
            description: data.description || '',
            categories: data.categories || [],
            avatarUrl: data.avatarUrl || '', // optional future field
          });
        }
      });
      setProviders(result);
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Providers for {selectedCategory}</Text>
      </View>

      <View style={styles.filterRow}>
        {/* Placeholder for filters if needed */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 30 }}>Loading providers...</Text>
        ) : providers.length === 0 ? (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 30 }}>No providers found for this service.</Text>
        ) : (
          providers.map((provider) => (
            <View key={provider.id} style={styles.card}>
              {provider.avatarUrl ? (
                <Image source={{ uri: provider.avatarUrl }} style={styles.avatar} />
              ) : (
                <Ionicons name="person-circle-outline" size={70} color="#2BF067" style={styles.avatarIcon} />
              )}
              <View style={styles.cardContent}>
                <Text style={styles.verified}>Verified</Text>
                <Text style={styles.name}>{provider.name}</Text>
                <Text style={styles.description}>{provider.description}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 4 }}>
                  {Array.isArray(provider.categories) &&
                    provider.categories.slice(0, 4).map((cat, idx) => (
                      <View key={idx} style={styles.tag}>
                        <Text style={styles.tagText}>{cat}</Text>
                      </View>
                    ))}
                </View>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('ProviderProfile', { provider })}
                >
                  <Text style={styles.viewButtonText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
  avatarIcon: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 14,
    backgroundColor: '#2D4435',
    textAlign: 'center',
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
  tag: {
    backgroundColor: '#2BF06733',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#2BF067',
    fontSize: 12,
    fontWeight: '600',
  },
});
