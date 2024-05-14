import { View, Text, TextInput, ScrollView, TouchableOpacity, ImageBackground, } from 'react-native';
import styles from './styles';

const LoginScreen = () => {
    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Input
                    style={styles.input}
                    placeholder="Phone"
                />
                <Input
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default LoginScreen;