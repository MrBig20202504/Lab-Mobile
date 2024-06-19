import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Login';
import Hometab from './TabPages/Hometab';
import TransactionTab from './TabPages/TransactionTab';
import CustomerTab from './TabPages/CustomerTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoutScreen from './TabPages/LogoutTab';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: '#A349A4',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Tab.Screen name="Home" component={Hometab} />
    <Tab.Screen name="Transaction" component={TransactionTab} />
    <Tab.Screen name="Customer" component={CustomerTab} />
    <Tab.Screen name="Setting" component={LogoutScreen} options={{ headerShown: true }} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
