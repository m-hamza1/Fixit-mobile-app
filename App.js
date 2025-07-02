import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen name="Login" component={ServiceProviderLogin} />
        
        <Stack.Screen name="Profile" component={ServiceProviderProfile} />

        <Stack.Screen
          name="ServiceProviderProfileStep1"
          component={ServiceProviderProfileStep1}
          options={{ headerShown: false }} />

          <Stack.Screen name="ServiceProviderJobRequests"
          component={ServiceProviderJobRequests}
          options={{ headerShown: false }} />

            
          <Stack.Screen
            name="ServiceProviderBookings"
            component={ServiceProviderBookings}
            options={{ headerShown: false }}
          />

          <Stack.Screen
          name="ServiceProviderJobStatus"
          component={ServiceProviderJobStatus}
          options={{ headerShown: false }}
        />

           <Stack.Screen
          name="ServiceProviderHistory"
          component={ServiceProviderHistory}
          options={{ headerShown: false }}
        />
                
      </Stack.Navigator>
    </NavigationContainer>
  );
}
