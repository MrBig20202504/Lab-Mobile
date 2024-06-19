import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionDetailScreen from '../src/TransactionScreenDetail';
import TransactionScreen from '../src/TransactionScreen';
import AddTransactionScreen from '../src/AddTransactionScreen';

const Stack = createStackNavigator();

const TransactionTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="TransactionScreen"
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
        name="TransactionScreen"
        component={TransactionScreen}
        options={{ title: 'Transactions', headerLeft: () => null, }}
      />
      <Stack.Screen
        name="TransactionDetailScreen"
        component={TransactionDetailScreen}
        options={{ title: 'Detail' }}
      />

      <Stack.Screen
        name="AddTransactionScreen"
        component={AddTransactionScreen}
        options={{ title: 'Add transactions' }}
      />
    </Stack.Navigator>
  );
};

export default TransactionTab;
