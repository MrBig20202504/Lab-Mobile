import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const route = useRoute();
    const { id } = route.params; 
    const [token, setToken] = useState('');
    const navigation = useNavigation();

    const test = async () => {
        setToken(await AsyncStorage.getItem('token'));
        console.log(token)
        console.log(id)
    }

    const update = async () => {
        setToken(await AsyncStorage.getItem('token'));
        
        fetch('https://kami-backend-5rs0.onrender.com/services/'+id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                name: name,
                price: price, 
            }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                Alert.alert("Success", "Product update successfully!");
                console.log('Response data:', data);
                navigation.goBack;
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert("Error", "Failed to update product. Please try again later.");
            });
    }

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
                    onPress={update}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={test}
                >
                    <Text style={styles.buttonText}>test</Text>
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
        color: '#D61553',
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
        paddingHorizontal: 10, // Added padding for better text input experience
    },
    button: {
        backgroundColor: '#D61553',
        borderRadius: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 20, // Increased margin for better separation from input fields
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default UpdateScreen;
