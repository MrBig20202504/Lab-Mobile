import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { IconButton, MD3Colors } from "react-native-paper";

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const filePath = 'https://kami-backend-5rs0.onrender.com/services';
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
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Detail', {
                itemID: item._id,
                itemName: item.name,
                itemPrice: item.price,
                itemCreatedBy: item.createdBy,
                itemTime: item.createdAt,
                itemUpdate: item.updatedAt
            })}
        >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>KAMI MASSAGE</Text>
            </View>
            <IconButton
                icon="plus"
                mode="outlined"
                iconColor={MD3Colors.error50}
                size={20}
                style={styles.addButton}
                onPress={() => navigation.navigate('Add Product')}
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text>No products found.</Text>
                    </View>
                )}
            />
        </SafeAreaView >
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
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
        color: '#A349A4',
        fontSize: 40,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        flex: 1,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        color: 'black',
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
