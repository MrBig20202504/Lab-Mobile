import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
const LoginScreen = () => {
    const [data, setData] = useState({})
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [token, setToken] = useState('')
    const filePath = 'https://kami-backend-5rs0.onrender.com/auth';

    const storeData = async (token) => {
        try {
            await AsyncStorage.setItem(1, token);
        } catch (e) {
        }
    };

    const login = async () => {

        const postData = {
            phone: '0373007856',
            password: '123',
        };
        await fetch(filePath, {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setToken(d.token);
                storeData
                console.log(token);
            })
            .catch((error) => {
                console.error('Error fetching data', error);
            });

    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    color='black'
                    placeholder="Phone"
                    placeholderTextColor={'black'}
                    onChange={setPhone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    color='black'
                    placeholderTextColor={'black'}
                    onChange={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={login}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 45,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#D61553',
        marginBottom: 10,
        marginTop: 0,
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
        backgroundColor: '#D61553',
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