import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";


const HomeScreen = () => {
    const [data, setData] = useState([])
    const filePath = 'https://kami-backend-5rs0.onrender.com/services';

    useEffect(() => {
        home();
    }, []);

    const home = async () => {
        await fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d)
            })
            .catch((error) => {
                console.error('Error fetching data', error);
            });;
    }

    const RenderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>HUYỀN TRINH</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>TITLE</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#D61553',
    },
    headerText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        color: '#D61553',
        fontSize: 50,
        fontWeight: 'bold',
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#888',
    },
});