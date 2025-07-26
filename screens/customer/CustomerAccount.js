import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomerAccount = () => {
  const navigation = useNavigation();

  // Dummy user data
  const customer = {
    name: 'Ali Raza',
    email: 'ali@example.com',
    phone: '03123456789',
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          // Clear async storage / auth state if needed
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0F2018" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
        <View style={{ width: 26 }} /> {/* Symmetric space */}
      </View>

      {/* Profile Info */}
      <View style={styles.profileBox}>
        <Ionicons name="person-circle" size={80} color="#2BF067" />
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.email}>{customer.email}</Text>
        <Text style={styles.phone}>📞 {customer.phone}</Text>

        {/* Edit Profile */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile', { customer })}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation (copied from CustomerHome) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerHome')}>
          <Ionicons name="home" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="calendar-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPostedServices')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerAccount')}>
          <Ionicons name="person-outline" size={24} color="#2BF067" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default CustomerAccount;

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
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileBox: {
    backgroundColor: '#1A2D23',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2BF067',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  phone: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  editButton: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#2BF067',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: '#FF4D4D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
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
