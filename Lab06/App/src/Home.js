import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { IconButton, MD3Colors } from "react-native-paper";

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const filePath = 'https://kami-backend-5rs0.onrender.com/services';
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

    const RenderItem = ({ item }) => (
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
            <View style={styles.buitonView} >
                <IconButton
                    icon="plus"
                    mode="outlined"
                    iconColor={MD3Colors.error50}
                    size={20}
                    onPress={() => navigation.navigate('Add Product')}
                />
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={item => (item.id ? item.id.toString() : null)}
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
    button: {

        backgroundColor: 'red',
        width: 1,
    },

    buitonView: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginLeft: 310,
    },
    title: {
        color: '#A349A4',
        fontSize: 40,
        fontWeight: 'bold',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 15,
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
});
