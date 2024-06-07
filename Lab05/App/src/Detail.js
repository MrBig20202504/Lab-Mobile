import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = () => {
    const [token, setToken] = useState('');
    const route = useRoute();
    const navigation = useNavigation();
    const { itemID, itemName, itemPrice, itemCreatedBy, itemTime, itemUpdate } = route.params;

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        };
        fetchToken();
    }, []);

    const handleDelete = async () => {
        if (!token) {
            Alert.alert("Error", "No token found. Please login again.");
            return;
        }

        try {
            const response = await fetch('https://kami-backend-5rs0.onrender.com/services/' + itemID, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            Alert.alert("Success", "Deleted successfully!");
            console.log('Response data:', data);
            navigation.goBack();
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Error", "Failed to delete product. Please try again later.");
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: handleDelete
                }
            ]
        );
    };

    return (
        <MenuProvider style={{ flex: 1 }}>
            <View style={styles.container}>
                <Menu>
                    <MenuTrigger style={styles.menuContainer}>
                        <Text style={styles.text}>...</Text>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => navigation.navigate('Update', { id: itemID })}>
                            <Text style={styles.text}>Update</Text>
                        </MenuOption>
                        <MenuOption onSelect={confirmDelete}>
                            <Text style={styles.text}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>ID: </Text>
                <Text style={styles.itemText}>{itemID}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>Service name: </Text>
                <Text style={styles.itemText}>{itemName}</Text>
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.title}>Price: </Text>
                <Text style={styles.itemText}>{itemPrice}</Text>
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.title}>Creator: </Text>
                <Text style={styles.itemText}>{itemCreatedBy}</Text>
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.title}>Time: </Text>
                <Text style={styles.itemText}>{itemTime}</Text>
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.title}>Final update: </Text>
                <Text style={styles.itemText}>{itemUpdate}</Text>
            </View>
        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: "bold",
    },
    itemText: {
        color: 'black',
        fontSize: 16,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    menuContainer: {
        marginLeft: 270,
        padding: 10,
    },
    text: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 20,
    },
});

export default DetailScreen;
