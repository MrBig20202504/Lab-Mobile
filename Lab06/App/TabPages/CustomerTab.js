import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionDetailScreen from '../src/TransactionScreenDetail';
import TransactionScreen from '../src/TransactionScreen';
import CustomerScreen from '../src/CustomerScreen';
import AddScreen from '../src/AddCustomer';

const Stack = createStackNavigator();

const CustomerTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomerScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#A349A4', 
        },
        headerTintColor: 'white', 
        headerTitleStyle: {
          fontWeight: 'bold', 
        },
      }}>
      <Stack.Screen 
        name="CustomerScreen" 
        component={CustomerScreen} 
        options={{ title: 'Customers', headerLeft: () => null}} 
      />
      <Stack.Screen 
        name="AddCustomerScreen" 
        component={AddScreen} 
        options={{ title: 'Add new Customer' }} 
      />
    </Stack.Navigator>
  );
};

export default CustomerTab;
