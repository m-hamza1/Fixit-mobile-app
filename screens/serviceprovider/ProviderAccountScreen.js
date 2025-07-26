import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProviderAccountScreen = () => {
  const [name, setName] = useState('Ali Raza');
  const [phone, setPhone] = useState('03001234567');
  const [email, setEmail] = useState('ali@example.com');
  const [password, setPassword] = useState('12345678');
  const [services, setServices] = useState(['Electrician', 'Plumber']);

  const navigation = useNavigation();
  const allServices = ['Electrician', 'Plumber', 'Cleaner', 'Painter', 'Carpenter'];

  const toggleService = (service) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  const handleUpdate = () => {
    alert('Profile updated successfully!');
  };

  return (
    <View style={styles.outerContainer}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.label}>Services Provided</Text>
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
      </ScrollView>

      {/* Bottom Nav */}
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
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  serviceText: {
    color: '#aaa',
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
