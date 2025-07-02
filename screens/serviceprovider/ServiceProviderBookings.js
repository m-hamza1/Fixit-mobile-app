import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ServiceProviderBookings = () => {
  const navigation = useNavigation();

  const todayBookings = [
    {
      title: 'Plumbing Repair',
      customer: 'Ethan Carter',
      time: '10:00 AM',
    //   image: require('../../assets/plumbing.jpg'),
    },
    {
      title: 'Electrical Wiring',
      customer: 'Olivia Bennett',
      time: '2:00 PM',
    //   image: require('../../assets/electrical.jpg'),
    },
  ];

  const upcomingBookings = [
    {
      title: 'Appliance Repair',
      customer: 'Noah Thompson',
      time: 'Tomorrow, 9:00 AM',
    //   image: require('../../assets/appliance.jpg'),
    },
    {
      title: 'HVAC Maintenance',
      customer: 'Sophia Clark',
      time: '2 days, 11:00 AM',
    //   image: require('../../assets/hvac.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Today */}
        <Text style={styles.sectionTitle}>Today</Text>
        {todayBookings.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardLeft}>
              <Text style={styles.labelNew}>New</Text>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobDetails}>
                Customer: {item.customer} · {item.time}
              </Text>
              <TouchableOpacity style={styles.acceptBtn}>
                <Text style={styles.acceptText}>Accept ✓</Text>
              </TouchableOpacity>
            </View>
            <Image source={item.image} style={styles.cardImage} />
          </View>
        ))}

        {/* Upcoming */}
        <Text style={styles.sectionTitle}>Upcoming</Text>
        {upcomingBookings.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardLeft}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobDetails}>
                Customer: {item.customer} · {item.time}
              </Text>

              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => navigation.navigate('ServiceProviderJobStatus')}
              >
                <Text style={styles.viewText}>View →</Text>
              </TouchableOpacity>


            
            </View>
            <Image source={item.image} style={styles.cardImage} />
          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={22} color="#A0BDA0" />
        <Ionicons name="calendar" size={22} color="#2BF067" />
        <Ionicons name="chatbubble-outline" size={22} color="#A0BDA0" />
        <Ionicons name="person-outline" size={22} color="#A0BDA0" />
      </View>
    </View>
  );
};

export default ServiceProviderBookings;

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
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#1A2F24',
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardLeft: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  labelNew: {
    color: '#2BF067',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  jobDetails: {
    color: '#A0BDA0',
    fontSize: 13,
    marginVertical: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  acceptBtn: {
    backgroundColor: '#2BF067',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  acceptText: {
    fontWeight: 'bold',
    color: '#0F2018',
  },
  viewBtn: {
    backgroundColor: '#2D4435',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
