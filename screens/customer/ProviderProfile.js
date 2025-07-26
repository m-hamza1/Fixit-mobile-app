import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // or use react-native-vector-icons

const ProfileProvider = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#ffffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=52' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Alex Johnson</Text>
          <Text style={styles.service}>Plumbing Services</Text>
          <Text style={styles.verified}>✔ Verified Provider</Text>
        </View>

        {/* Ratings */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ 4.8</Text>
          <Text style={styles.reviewCount}>125 reviews</Text>
        </View>

        {/* About */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>About Alex</Text>
          <Text style={styles.sectionText}>
            Alex Johnson is a certified plumber with 10+ years of experience in leak detection,
            pipe repairs, and fixture installations.
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>

          <View style={styles.reviewCard}>
            <Text style={styles.reviewerName}>Sophia Clark</Text>
            <Text style={styles.reviewDate}>2 weeks ago</Text>
            <Text style={styles.reviewText}>
              Alex was incredibly professional and fixed our leaky faucet in no time. Highly
              recommend!
            </Text>
          </View>

          <View style={styles.reviewCard}>
            <Text style={styles.reviewerName}>Ethan Miller</Text>
            <Text style={styles.reviewDate}>1 month ago</Text>
            <Text style={styles.reviewText}>
              Alex did a good job installing our new toilet, but was a bit late to the appointment.
            </Text>
          </View>
          
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('BookService')}>
        <Text style={styles.bookButtonText}>Request Service</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default ProfileProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2018',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#2D4435',
    marginBottom: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  service: {
    color: '#B6C7BC',
    fontSize: 16,
    marginTop: 4,
  },
  verified: {
    color: '#A4F3C4',
    fontSize: 14,
    marginTop: 4,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 38,
    color: '#FFD700',
    fontWeight: '700',
  },
  reviewCount: {
    color: '#B6C7BC',
    fontSize: 15,
  },
  detailsCard: {
    backgroundColor: '#1A2D23',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionText: {
    color: '#B6C7BC',
    fontSize: 14,
    lineHeight: 20,
  },
  reviewCard: {
    backgroundColor: '#2A3C30',
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  reviewerName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  reviewDate: {
    color: '#9BAEA2',
    fontSize: 12,
    marginBottom: 4,
  },
  reviewText: {
    color: '#DDEDE4',
    fontSize: 13,
  },
  bookButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#2BF067',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 10,
  },
  bookButtonText: {
    color: '#0F2018',
    fontSize: 17,
    fontWeight: '700',
  },
});
