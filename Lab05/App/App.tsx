import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './src/Login';
import HomeScreen from './src/Home';
import DetailScreen from './src/Detail';
import AddScreen from './src/AddProduct';
import UpdateScreen from './src/UpdateProduct';
const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="Add Product" component={AddScreen} />
                <Stack.Screen name="Update" component={UpdateScreen} />
                {/* <Stack.Screen name="Delete" component={DeleteScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
