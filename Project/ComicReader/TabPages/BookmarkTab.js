import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DetailScreen from '../src/Detail';
import ReadingScreen from '../src/ReadingScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import BookmarkScreen from '../src/BookmarkScreen';
const Stack = createStackNavigator();

const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={{
        width: 40,
        height: 40,
        marginLeft: 15,
        borderRadius: 20,
        overflow: 'hidden',
      }}>
        <Image
          source={require('../Image/OIG4.jpg')}
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
};

const BookmarkTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{
        header: () => <CustomHeader />,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="BookmarkScreen"
        component={BookmarkScreen}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
      />
      <Stack.Screen
        name="ReadingScreen"
        component={ReadingScreen}
      />
    </Stack.Navigator>
  );
};

export default BookmarkTab;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: '#171717',
  },
  imageContainer: {
    width: 40,
    height: 40,
    marginLeft: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
});
