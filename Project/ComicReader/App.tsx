import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Hometab from './TabPages/Hometab';
import SearchTab from './TabPages/SearchTab';
import BookmarkTab from './TabPages/BookmarkTab';
import LogoutScreen from './TabPages/LoginTab';
import { Image, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './TabPages/LoginTab';

const Tab = createBottomTabNavigator();

const App = () => {

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 28,
      color: 'white',
      fontWeight: "bold",
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#171717',
      paddingVertical: 10,
    }
  });

  function CustomHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={{
          width: 40,
          height: 40,
          marginLeft: 15,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
          <Image
            source={require('./Image/OIG4.jpg')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <Text style={styles.headerText}>ComicReader</Text>
        <View>
          <FontAwesome5 name="user-circle" size={35} color="white" style={{ marginRight: 15 }} />
        </View>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#171717',
          },
          tabBarLabelStyle: {
            color: 'white',
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          header: () => <CustomHeader />,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Hometab}
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={BookmarkTab}
          options={{
            tabBarLabel: 'Bookmark',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="book" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={LoginScreen}
          options={{
            headerShown: true,
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
