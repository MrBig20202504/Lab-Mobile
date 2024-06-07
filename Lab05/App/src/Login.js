import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [token, setToken] = useState('');
    const storeData = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
            console.log(await AsyncStorage.getItem('token'));
        } catch (e) {
            console.error('Error storing token', e);
        }
    };
    const login = async () => {
        const filePath = 'https://kami-backend-5rs0.onrender.com/auth';
        setPassword('123');
        setPhone('0373007856');

        
        
        const postData = {
            phone: phone,
            password: password,
        };

        try {
            const response = await fetch(filePath, {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (!response.ok) {
                throw new Error('Wrong password or phone');
            }

            const data = await response.json();
            
            setToken(data.token);
            storeData(token);
            console.log(token);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error fetching data', error);
            alert('Invalid phone or password. Please try again.');
        }

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
                    onChangeText={text => setPhone(text)}
                    value={phone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    color='black'
                    placeholderTextColor={'black'}
                    onChangeText={text => setPassword(text)}
                    value={password}
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

export default LoginScreen;
