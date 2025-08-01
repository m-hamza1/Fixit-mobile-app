import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../../utils/firebase';
import { ref, onValue, remove } from 'firebase/database';

const MyPostedServices = () => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);

  useEffect(() => {
    let userId = null;
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setServices([]);
        return;
      }
      userId = user.uid;
      const servicesRef = ref(db, 'services');
      const unsubscribeDb = onValue(servicesRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setServices([]);
          return;
        }
        const userServices = Object.entries(data)
          .filter(([id, service]) => service.userId === userId)
          .map(([id, service]) => ({ id, ...service }));
        setServices(userServices);
      });
      return () => unsubscribeDb();
    });
    return () => unsubscribeAuth();
  }, []);

  const handleEdit = (id) => {
    const selected = services.find(service => service.id === id);
    if (selected) {
      navigation.navigate('PostServiceScreen', { serviceToEdit: selected });
    } else {
      Alert.alert('Error', 'Service not found for editing.');
    }
  };

  const handleCancel = (id) => {
    Alert.alert(
      'Cancel Service',
      'Are you sure you want to cancel this service?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await remove(ref(db, 'services/' + id));
            } catch (error) {
              alert('Error cancelling service: ' + error.message);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.category}</Text>
      {item.address && <Text style={styles.detail}>📍 {item.address}</Text>}
      {item.phone && <Text style={styles.detail}>📞 {item.phone}</Text>}
      {(item.date || item.time) && (
        <Text style={styles.detail}>
          🗓️ {item.date}{item.time ? ` at ${item.time}` : ''}
        </Text>
      )}
      {item.description && <Text style={styles.detail}>{item.description}</Text>}
      <Text style={[styles.detail, { color: '#FFD700', fontWeight: 'bold' }]}>
        Status: {item.status ? item.status : 'Pending'}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item.id)}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => handleCancel(item.id)}>
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F2018" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Posted Services</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* List or No Data */}
      {services.length > 0 ? (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Ionicons name="information-circle-outline" size={48} color="#2BF067" />
          <Text style={styles.noDataText}>No posted service</Text>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerHome')}>
          <Ionicons name="home" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="calendar-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPostedServices')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2BF067" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerAccount')}>
          <Ionicons name="person-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyPostedServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#1A2D23',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2BF067',
    marginBottom: 8,
  },
  detail: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  editBtn: {
    flexDirection: 'row',
    backgroundColor: '#2BF067',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF4D4D',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  noDataText: {
    color: '#A0BDA0',
    fontSize: 18,
    marginTop: 12,
  },
});
