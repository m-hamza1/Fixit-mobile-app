import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');  
    }, 10000); // 2 seconds

    return () => clearTimeout(timer); // Clean up
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>FIXIT</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/plant.png')} // Your image here
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.subtitle}>
        Connecting You with Trusted Local{'\n'}Service Providers
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122019',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  imageContainer: {
    backgroundColor: '#1a2a24',
    borderRadius: 16,
    padding: 40,
    marginBottom: 30,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8D7C2',
    alignSelf: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SplashScreen;
