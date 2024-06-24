import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { IconButton, MD3Colors } from "react-native-paper";

const CustomerScreen = () => {
    const [data, setData] = useState([]);
    const filePath = 'https://kami-backend-5rs0.onrender.com/customers';
    const navigation = useNavigation();

    useEffect(() => {
        home();
    }, []);

    const home = async () => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }
    const formatNumber = (num) => {
        const maxLength = 9;
        const numString = num.toString();
        if (numString.length > maxLength) {
            return numString.substring(0, maxLength - 3) + '...';
        }
        return numString;
    }

    const RenderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.smallContainer}
            onPress={() => navigation.navigate('CustomerDetailScreen', { ID: item._id })}
        >
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.text}>Customer: </Text>
                        <Text style={styles.dataText}>{item.name}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.text}>phone: </Text>
                        <Text style={styles.dataText}>{item.phone}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.text}>Total money: </Text>
                        <Text style={styles.dataText}>{formatNumber(item.totalSpent)}</Text>
                    </View>
                </View>

                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <FontAwesome5 name="crown" size={30} color="#A349A4" />
                        <Text style={styles.iconText}>{item.loyalty}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.container}>
            <IconButton
                icon="plus"
                mode="outlined"
                iconColor={MD3Colors.error50}
                size={20}
                style={styles.addButton}
                onPress={() => navigation.navigate('AddCustomerScreen')}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={item => (item.id ? item.id.toString() : null)}
            />
        </SafeAreaView>
    );
};
export default CustomerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    smallContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
    },
    addButton: {
        position: 'absolute',
        borderRadius: 25,
        right: 20,
        bottom: 10,
        zIndex: 1,
        height: 50,
        width: 50,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        color: '#A349A4',
        fontWeight: "bold",
        marginBottom: 10,
    },
    iconText: {
        fontSize: 15,
        color: '#A349A4',
        fontWeight: "bold",
    },
    text: {
        color: '#6E6E6E',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dataText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
});
