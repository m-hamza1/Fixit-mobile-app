import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../utils/firebase';
import { ref, get, update } from 'firebase/database';

const allServices = [
  'Plumber', 'Electrician', 'Cleaner', 'Painter', 'Handyman', 'Gardener',
  'Carpenter', 'AC Technician', 'Appliance Repair', 'Welder', 'Mason',
  'Roofer', 'Glass Fitter', 'Locksmith', 'Pest Control', 'Water Tank Cleaning',
  'CCTV Installer', 'Internet Technician'
];

const ProviderAccountScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = ref(db, 'users/' + user.uid);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setName(data.name || '');
            setPhone(data.phone || '');
            setEmail(data.email || '');
            setServices(data.categories || []);
          }
        }
      } catch (error) {
        ToastAndroid.show('Failed to load data!', ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const toggleService = (service) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = ref(db, 'users/' + user.uid);
      await update(userRef, {
        name,
        phone,
        email,
        categories: services,
      });

      ToastAndroid.show('Profile updated!', ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show('Update failed!', ToastAndroid.SHORT);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (e) {
      ToastAndroid.show('Logout failed!', ToastAndroid.SHORT);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2BF067" />
        <Text style={{ color: '#ccc', marginTop: 12 }}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Provider Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#777"
          style={styles.input}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone"
          placeholderTextColor="#777"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="#777"
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.label}>Services You Offer</Text>
        <View style={styles.servicesContainer}>
          {allServices.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.serviceItem,
                services.includes(service) && styles.serviceSelected,
              ]}
              onPress={() => toggleService(service)}
            >
              <Text
                style={[
                  styles.serviceText,
                  services.includes(service) && styles.serviceTextSelected,
                ]}
              >
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Ionicons name="save" size={20} color="#000" style={{ marginRight: 6 }} />
          <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('ProviderHomeScreen')}>
          <Ionicons name="home" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
          <Ionicons name="calendar-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProviderAccountScreen')}>
          <Ionicons name="person" size={24} color="#2BF067" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProviderAccountScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0F2018',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F2018',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 55,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
  },
  label: {
    color: '#B6C7BC',
    marginBottom: 6,
    marginTop: 16,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1A2D23',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  serviceItem: {
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  serviceText: {
    color: '#ccc',
    fontSize: 13,
  },
  serviceSelected: {
    backgroundColor: '#2BF067',
    borderColor: '#2BF067',
  },
  serviceTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
  updateBtn: {
    backgroundColor: '#2BF067',
    marginTop: 30,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  updateText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logoutBtn: {
    backgroundColor: '#FF4D4D',
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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
