import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerDetailScreen = ({ route, navigation }) => {
    const { ID } = route.params;
    const [token, setToken] = useState('');
    const [data, setData] = useState(null);
    const filePath = `https://kami-backend-5rs0.onrender.com/customers/${ID}`;

    useEffect(() => {
        const fetchTokenAndData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    await fetchCustomerData(storedToken);
                } else {
                    console.log('Token not found');
                }
            } catch (error) {
                console.error('Error fetching token', error);
            }
        };

        fetchTokenAndData();
    }, []);

    const fetchCustomerData = async (token) => {
        try {
            const response = await fetch(filePath, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const formatNumber = (num) => {
        const maxLength = 12;
        const numString = num.toString();
        if (numString.length > maxLength) {
            return numString.substring(0, maxLength - 3) + '...';
        }
        return numString;
    };

    const handleDelete = async () => {
        if (!token) {
            Alert.alert("Error", "No token found. Please login again.");
            return;
        }

        try {
            const response = await fetch(filePath, {
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
            Alert.alert("Error", "Failed to delete. Please try again later.");
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

    if (!data) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <MenuProvider style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#D8C2E0', padding: 10 }}>
                <Menu style={styles.menuButton}>
                    <MenuTrigger>
                        <Text style={styles.title}>...</Text>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => navigation.navigate('CustomerUpdateScreen', { id: ID, filePath: filePath })}>
                            <Text style={styles.text}>Update</Text>
                        </MenuOption>
                        <MenuOption onSelect={confirmDelete}>
                            <Text style={styles.text}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
                <View style={styles.container}>
                    <Text style={styles.title}>General Information</Text>

                    <View style={styles.minorContainer}>
                        <Text style={styles.dataText}>Name:</Text>
                        <Text style={styles.text}>{data.name} - {data.phone}</Text>
                    </View>

                    <View style={styles.minorContainer}>
                        <Text style={styles.dataText}>Phone:</Text>
                        <Text style={styles.text}>{data.phone}</Text>
                    </View>

                    <View style={styles.minorContainer}>
                        <Text style={styles.dataText}>Total Spent:</Text>
                        <Text style={styles.costText}>{data.totalSpent}</Text>
                    </View>

                    <View style={styles.minorContainer}>
                        <Text style={styles.dataText}>Time:</Text>
                        <Text style={styles.costText}>{data.updatedAt}</Text>
                    </View>

                    <View style={styles.minorContainer}>
                        <Text style={styles.dataText}>Last Update:</Text>
                        <Text style={styles.costText}>{data.updatedBy}</Text>
                    </View>

                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.title}>Transactions history</Text>
                    <FlatList
                        data={data.transactions}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.minorContainer}>
                                <View style={{ flex: 1, borderWidth: 0.5, borderRadius: 10, padding: 10 }}>
                                    <Text style={styles.dataText}>{item.id} - {new Date(item.createdAt).toLocaleString()}</Text>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                            <FlatList
                                                data={item.services}
                                                keyExtractor={(item) => item._id}
                                                renderItem={({ item }) => (
                                                    <View style={{ marginTop: 5 }}>
                                                        <Text style={styles.text}>-{item.name}</Text>
                                                    </View>
                                                )}
                                            />
                                        </View>

                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Text style={{ fontWeight: "bold", color: '#A349A4' }}>{formatNumber(item.price)} đ</Text>
                                        </View>


                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </MenuProvider >
    );
};

export default CustomerDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'left',
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
    },
    minorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    bottomContainer: {
        flex: 2,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    menuButton: {
        flex: 0.2,
        backgroundColor: 'white',
        width: '10%',
        height: '10%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20
    }, title: {
        fontSize: 20,
        color: '#A349A4',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        color: '#6E6E6E',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    costText: {
        color: '#A349A4',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    dataText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
