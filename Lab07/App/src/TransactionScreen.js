import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { IconButton, MD3Colors } from "react-native-paper"; // Make sure IconButton and MD3Colors are imported

const TransactionScreen = () => {
    const [data, setData] = useState([]);
    const filePath = 'https://kami-backend-5rs0.onrender.com/transactions';
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
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

    const RenderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.smallContainer}
            onPress={() => navigation.navigate('TransactionDetailScreen', { data: item })}
        >
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{item.id}-{new Date(item.createdAt).toLocaleString()}</Text>
                <Text style={styles.title}>{item.status === 'cancelled' ? 'Cancelled' : ''}</Text>
                <Text style={styles.sectionTitle}>Services:</Text>
                <FlatList
                    data={item.services}
                    keyExtractor={(service) => service._id}
                    renderItem={({ item }) => (
                        <View style={styles.serviceItem}>
                            <Text style={styles.serviceText}>-{item.name}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.priceContainer}>
                <Text style={{ fontWeight: "bold", color: '#A349A4' }}>{formatNumber(item.price)} đ</Text>
            </View>
        </TouchableOpacity>
    );

    const formatNumber = (num) => {
        const maxLength = 9;
        const numString = num.toString();
        if (numString.length > maxLength) {
            return numString.substring(0, maxLength - 3) + '...';
        }
        return numString;
    }

    return (
        <SafeAreaView style={styles.container}>
            <IconButton
                icon="plus"
                mode="outlined"
                iconColor={MD3Colors.error50}
                size={20}
                style={styles.addButton}
                onPress={() => navigation.navigate('AddTransactionScreen')}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={item => (item.id ? item.id.toString() : null)}
            />
        </SafeAreaView>
    );
};

export default TransactionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    smallContainer: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 0.5,
        marginBottom: 15,
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 3,
    },
    priceContainer: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    serviceItem: {},
    serviceText: {
        color: 'black',
        fontSize: 15,
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
});
