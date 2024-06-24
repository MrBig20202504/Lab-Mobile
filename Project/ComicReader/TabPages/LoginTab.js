import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // 
        navigation.navigate('HomeTab');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../Image/OIG4.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay} />
            </ImageBackground>

            <View style={styles.formContainer}>
                <Text style={styles.logo}>ComicReader</Text>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../Image/OIG4.jpg')} // Replace with your image source
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username"
                        placeholderTextColor="#BDBDBD"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#BDBDBD"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to make text readable
    },
    logo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    avatarContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        marginBottom: 10,
        borderWidth: 3,
        borderColor: 'white',
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    inputView: {
        width: '100%',
        backgroundColor: 'rgba(38, 38, 38, 0.8)',
        borderRadius: 10,
        height: 50,
        marginBottom: 10,
        justifyContent: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: 'white',
    },
    loginBtn: {
        width: '100%',
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
