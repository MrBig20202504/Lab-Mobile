import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Button, Text, View, TextInput } from "react-native";
import styles from "./src/styles";
import { Colors } from "react-native/Libraries/NewAppScreen";

const SearchProduct = () => {
    const [data, setData] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [filePath, setPath] = useState('https://dummyjson.com/products');

    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d.products);
            })
            .catch((error) => {
                console.error('Error fetching data', error);
            });
    }, [filePath]);

    const searchNameProduct = () => {
        if (searchName) {
            setPath(`https://dummyjson.com/products/search?q=` + searchName);
        } else
            if (searchName === '')
                setPath('https://dummyjson.com/products');
    };

    const RenderItem = ({ data }) => (
        <View style={styles.container}>
            <View>
                <Image style={styles.img} source={{ uri: data.thumbnail }} />
            </View>
            <View style={styles.view}>
                <Text style={styles.title}>Title: {data.title}</Text>
                <Text style={styles.description}>Description: {data.description}</Text>
                <Text style={styles.price}>Price: ${data.price}</Text>
                <Text style={styles.discountPercentage}>Discount: {data.discountPercentage}%</Text>
                <Text style={styles.rating}>Rating: {data.rating}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16
            }}>
                <Text style={styles.title}>
                    Search
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter product name"
                    onChangeText={text => setSearchName(text)}
                    value={searchName}
                />
                <Button
                    style={styles.button}
                    title="Search"
                    onPress={searchNameProduct}
                />
            </View>
            <SafeAreaView style={styles.FlatListBasicsContainer}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <RenderItem data={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        </SafeAreaView>
    );
};

export default SearchProduct;
