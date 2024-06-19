import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionDetailScreen from '../src/TransactionScreenDetail';
import TransactionScreen from '../src/TransactionScreen';
import CustomerScreen from '../src/CustomerScreen';
import AddScreen from '../src/AddCustomer';
import CustomerDetailScreen from '../src/CustomerDetail';
import UpdateCustomerScreen from '../src/UpdateCustomerDetail';

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
      <Stack.Screen 
        name="CustomerDetailScreen" 
        component={CustomerDetailScreen} 
        options={{ title: 'Customer detail' }} 
      />
      <Stack.Screen 
        name="CustomerUpdateScreen" 
        component={UpdateCustomerScreen} 
        options={{ title: 'Update' }} 
      />

    </Stack.Navigator>
  );
};

export default CustomerTab;
