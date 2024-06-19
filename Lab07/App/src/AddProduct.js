import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [token, setToken] = useState('');
    const navigation = useNavigation();

    const test = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                console.log('Token:', storedToken);
            } else {
                console.log('Token not found');
            }
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const add = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (!storedToken) {
                throw new Error('Token not found. Please login again.');
            }

            const response = await fetch('https://kami-backend-5rs0.onrender.com/services', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + storedToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            Alert.alert("Success", "Product added successfully!");
            console.log('Response data:', data);

            navigation.goBack();
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Error", "Failed to add product. Please try again later.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Service name*</Text>
                <TextInput
                    style={styles.input}
                    color='black'
                    placeholder="Name"
                    placeholderTextColor={'black'}
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <Text style={styles.title}>Price*</Text>
                <TextInput
                    style={styles.input}
                    color='black'
                    placeholder="Price"
                    placeholderTextColor={'black'}
                    onChangeText={text => setPrice(text)}
                    value={price}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={add}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={test}
                >
                    <Text style={styles.buttonText}>Test AsyncStorage</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A349A4',
        marginBottom: 0,
        marginTop: 10,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        marginTop: 20,
        marginLeft: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#A349A4',
        borderRadius: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default AddScreen;
