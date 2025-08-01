import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { db, auth } from '../../utils/firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const CustomerHome = () => {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
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
  }, []);

  // Filter services based on search
  const filteredServices = services.filter(({ label }) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerWrapper}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome, Local Services</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('CustomerNotifications');
        }} style={{ position: 'relative' }}>
          <Ionicons name="notifications-outline" size={26} color="#A0BDA0" />
          {unreadCount > 0 && (
            <View style={{
              position: 'absolute',
              top: -4,
              right: -4,
              backgroundColor: 'red',
              borderRadius: 8,
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#A0BDA0" />
          <TextInput
            placeholder="Search for services"
            placeholderTextColor="#A0BDA0"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Popular Services</Text>

        {/* Services Grid */}
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {filteredServices.length === 0 ? (
            <Text style={{ color: '#ccc', textAlign: 'center', width: '100%', marginTop: 30 }}>
              No services available
            </Text>
          ) : (
            filteredServices.map(({ icon, label }, index) => (
              <ServiceButton
                key={index}
                icon={icon}
                label={label}
                onPress={() => navigation.navigate('ShownProviders', { category: label })}
              />
            ))
          )}
        </ScrollView>

        {/* Floating Button */}
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('PostServiceScreen')}>
          <Ionicons name="add" size={28} color="#000" />
        </TouchableOpacity>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <NavIcon icon="home" color="#2BF067" screen="CustomerHome" />
          <NavIcon icon="calendar-outline" screen="Dashboard" />
          <NavIcon icon="chatbubble-ellipses-outline" screen="MyPostedServices" />
          <NavIcon icon="person-outline" screen="CustomerAccount" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// Bottom Nav Icon
const NavIcon = ({ icon, color = '#A0BDA0', screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <Ionicons name={icon} size={24} color={color} />
    </TouchableOpacity>
  );
};

// Service Grid Button
const ServiceButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.serviceBtn} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={28} color="#2BF067" />
    <Text style={styles.serviceText}>{label}</Text>
  </TouchableOpacity>
);

// All service entries
const services = [
  { icon: 'tools', label: 'Plumber' },
  { icon: 'flash-outline', label: 'Electrician' },
  { icon: 'home-outline', label: 'Cleaner' },
  { icon: 'brush', label: 'Painter' },
  { icon: 'hammer-wrench', label: 'Handyman' },
  { icon: 'tree-outline', label: 'Gardener' },
  { icon: 'saw-blade', label: 'Carpenter' },
  { icon: 'air-conditioner', label: 'AC Technician' },
  { icon: 'fridge-outline', label: 'Appliance Repair' },
  { icon: 'welding', label: 'Welder' },
  { icon: 'wall', label: 'Mason' },
  { icon: 'home-roof', label: 'Roofer' },
  { icon: 'glassdoor', label: 'Glass Fitter' },
  { icon: 'lock-outline', label: 'Locksmith' },
  { icon: 'bug-outline', label: 'Pest Control' }, 
  { icon: 'water', label: 'Water Tank Cleaning' },
  { icon: 'cctv', label: 'CCTV Installer' },
  { icon: 'access-point-network', label: 'Internet Technician' },
];

export default CustomerHome;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0F2018',
  },
  innerWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchBox: {
    width: '100%',
    backgroundColor: '#2D4435',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceBtn: {
    width: '47%',
    backgroundColor: '#1A2D23',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 30,
    backgroundColor: '#2BF067',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    backgroundColor: '#1A2D23',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 8,
  },
});
