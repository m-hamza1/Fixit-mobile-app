import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// ✅ Splash & Ask role Screens
import AskRole from './screens/AskRole'; // Adjust the path as necessary
import SplashScreen from './screens/SplashScreen'; // Adjust the path as necessary
import Login from './screens/Login'; // Adjust the path as necessary
import ForgetPassword from './screens/ForgetPassword'; // Adjust the path as necessary 
import EnterVerificationCode from './screens/EnterVerificationCode'; // Adjust the path as necessary

// ✅ Service Provider Screens
import ServiceProviderJobRequests from './screens/serviceprovider/ServiceProviderJobRequests';
import ServiceProviderBookings from './screens/serviceprovider/ServiceProviderBookings';
import ServiceProviderJobStatus from './screens/serviceprovider/ServiceProviderJobStatus';
import ServiceProviderHistory from './screens/serviceprovider/ServiceProviderHistory';
import ProviderRegister from './screens/serviceprovider/ProviderRegister'; // Adjust the path as necessary
import RequestDetailsScreen from './screens/serviceprovider/RequestDetailsScreen';
import ProviderHomeScreen from './screens/serviceprovider/ProviderHomeScreen';
import ProviderAccountScreen from './screens/serviceprovider/ProviderAccountScreen'; // Adjust the path as necessary
import ProviderSentRequests from './screens/serviceprovider/ProviderSentRequests';


//Customer Screens
import ServiceProviderSignUp from './screens/customer/CustomerSignUp';
import CustomerRegister from './screens/customer/CustomerRegister';
import CustomerHome from './screens/customer/CustomerHome';
import ProviderProfile from './screens/customer/ProviderProfile'; 
import ShownProviders from './screens/customer/ShownProviders';  
import BoookService from './screens/customer/BookService'; // Assuming you have a BookService screen
import Dashboard from './screens/customer/Dashboard'; // Assuming you have a Dashboard screen
import ProviderDashboard from './screens/serviceprovider/ProviderDashboard';
import PostService from './screens/customer/PostService'; // Assuming you have a PostServiceScreen
import MyPostedServices from './screens/customer/MyPostedServices'; // Assuming you have a MyPostedServices screen
import CustomerAccount from './screens/customer/CustomerAccount'; // Assuming you have a CustomerAccount screen 
import EditProfile from './screens/customer/EditProfile'; // Assuming you have an EditProfile screen


// ✅ Create the Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />

        <Stack.Screen name="EnterVerificationCode" component={EnterVerificationCode} />

        <Stack.Screen name="AskRole" component={AskRole} />

        <Stack.Screen name="ProviderProfile" component={ProviderProfile} /> 

        <Stack.Screen name="ShownProviders" component={ShownProviders} />

        <Stack.Screen name="BookService" component={BoookService} />

        <Stack.Screen name="Dashboard" component={Dashboard} />

        <Stack.Screen name="ProviderRegister" component={ProviderRegister} />

        <Stack.Screen name="ProviderHomeScreen" component={ProviderHomeScreen} />

        <Stack.Screen name="ProviderAccountScreen" component={ProviderAccountScreen} />

        <Stack.Screen name="ProviderDashboard" component={ProviderDashboard} />
        
        <Stack.Screen name="RequestDetailsScreen" component={RequestDetailsScreen} />

        <Stack.Screen name="ProviderSentRequests" component={ProviderSentRequests} />

        <Stack.Screen name="ServiceProviderJobRequests" component={ServiceProviderJobRequests} />

        <Stack.Screen name="ServiceProviderBookings" component={ServiceProviderBookings} />

        <Stack.Screen name="ServiceProviderJobStatus" component={ServiceProviderJobStatus} />

        <Stack.Screen name="ServiceProviderHistory" component={ServiceProviderHistory} />

        <Stack.Screen name="ServiceProviderSignUp" component={ServiceProviderSignUp} />

        <Stack.Screen name="CustomerRegister" component={CustomerRegister} />

        <Stack.Screen name="CustomerHome" component={CustomerHome} />

        <Stack.Screen name="PostServiceScreen" component={PostService} />

        <Stack.Screen name="MyPostedServices" component={MyPostedServices} />

        <Stack.Screen name="CustomerAccount" component={CustomerAccount} />

        <Stack.Screen name="EditProfile" component={EditProfile} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
