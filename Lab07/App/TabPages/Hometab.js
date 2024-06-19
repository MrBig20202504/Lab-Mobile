import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../src/Home';
import DetailScreen from '../src/Detail';
import AddScreen from '../src/AddProduct';
import UpdateScreen from '../src/UpdateProduct';
const Stack = createStackNavigator();

const Hometab = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#A349A4', 
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'HUYỀN TRINH' }}/>
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Add Product" component={AddScreen} />
            <Stack.Screen name="Update" component={UpdateScreen} />
        </Stack.Navigator>
    );
};

export default Hometab;
