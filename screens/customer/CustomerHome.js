import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomerHome = () => {
  const navigation = useNavigation();

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0F2018',
      paddingTop: 55,
      alignItems: 'center',
    }}>
      <View style={{
        width: '90%',
        flexGrow: 1,
      }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: 'bold',
          }}>Welcome, Local Services</Text>
          <Ionicons name="notifications-outline" size={24} color="#A0BDA0" />
        </View>

        {/* Search Bar */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#2D4435',
          borderRadius: 12,
          paddingHorizontal: 15,
          paddingVertical: 12,
          alignItems: 'center',
          marginBottom: 25,
        }}>
          <Ionicons name="search" size={20} color="#A0BDA0" />
          <TextInput
            placeholder="Search for services"
            placeholderTextColor="#A0BDA0"
            style={{
              marginLeft: 10,
              color: '#fff',
              fontSize: 16,
              flex: 1,
            }}
          />
        </View>

        {/* Section Title */}
        <Text style={{
          color: '#fff',
          fontWeight: '700',
          fontSize: 18,
          marginBottom: 15,
        }}>Popular Services</Text>

        {/* Services Grid */}
        <ScrollView contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: 90,
        }}>
          <ServiceButton icon="hammer-wrench" label="Handyman" onPress={() => navigation.navigate('HandymanScreen')} />
          <ServiceButton icon="home-outline" label="Cleaning" onPress={() => navigation.navigate('CleaningScreen')} />
          <ServiceButton icon="flash-outline" label="Electrician" onPress={() => navigation.navigate('ElectricianScreen')} />
          <ServiceButton icon="tools" label="Plumber" onPress={() => navigation.navigate('PlumberScreen')} />
          <ServiceButton icon="brush" label="Painter" onPress={() => navigation.navigate('ShownProviders')} />
          <ServiceButton icon="tree-outline" label="Gardener" onPress={() => navigation.navigate('GardenerScreen')} />
        </ScrollView>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 80,
          right: 30,
          backgroundColor: '#2BF067',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 10,
        }}
        onPress={() => navigation.navigate('PostServiceScreen')}
      >
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>



      {/* Bottom Navigation */}
      <View style={{
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
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerHome')}>
          <Ionicons name="home" size={24} color="#2BF067" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="calendar-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPostedServices')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerAccount')}>
          <Ionicons name="person-outline" size={24} color="#A0BDA0" />
        </TouchableOpacity>
      </View>



    </View>
  );
};

const ServiceButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.serviceBtn} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={24} color="#2BF067" />
    <Text style={styles.serviceText}>{label}</Text>
  </TouchableOpacity>
);

export default CustomerHome;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0F2018',
    paddingTop: 55,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#2D4435',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  searchInput: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 90,
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceText: {
    color: '#fff',
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
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
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    backgroundColor: '#2BF067',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});
