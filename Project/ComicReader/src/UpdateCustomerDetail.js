import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateCustomerScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const route = useRoute();
    const { id, filePath } = route.params;
    const [token, setToken] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                } else {
                    console.log('Token not found');
                }
            } catch (error) {
                console.error('Error fetching token', error);
            }
        };

        fetchToken();
    }, []);

    const update = async () => {
        try {
            const response = await fetch(filePath, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            Alert.alert("Success", "Product updated successfully!");
            console.log('Response data:', data);
            navigation.goBack();
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Error", "Failed to update product. Please try again later.");
        }
    };

    const test = async () => {
        console.log(token);
        console.log(filePath);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Customer name*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={'black'}
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <Text style={styles.title}>Phone*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    placeholderTextColor={'black'}
                    onChangeText={text => setPhone(text)}
                    value={phone}
                    keyboardType="numeric"
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
                    <Text style={styles.buttonText}>Test</Text>
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
        marginBottom: 10,
        marginTop: 20, // Increased top margin for better separation
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#A349A4',
        borderRadius: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default UpdateCustomerScreen;
