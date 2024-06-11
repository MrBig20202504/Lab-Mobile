import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();
    const [token, setToken] = useState('');

    const test = async () => {
        setToken(await AsyncStorage.getItem('token'));
        console.log(token)
    }

    const add = async () => {
        setToken(await AsyncStorage.getItem('token'));

        fetch('https://kami-backend-5rs0.onrender.com/customers', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
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
                Alert.alert("Success", "Customer added successfully!");
                console.log('Response data:', data);
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert("Error", "Failed to add customer. Please try again later.");
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
                <Text style={styles.title}>Phone*</Text>
                <TextInput
                    style={styles.input}
                    color='black'
                    placeholder="Phone"
                    placeholderTextColor={'black'}
                    onChangeText={text => setPhone(text)}
                    value={phone}
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
