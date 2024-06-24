import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Button, Text, View, TextInput, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import { Colors } from "react-native/Libraries/NewAppScreen";

const SearchProduct = () => {
    const [data, setData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    const handleDetail = (product) => {
        setSelectedProduct(product);
    };

    const clearDetail = () => {
        setSelectedProduct(null);
    };

    const RenderItemWithCard = ({ item }) => (
        <Card>
            <Card.Content style={styles.cardContent}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: item.thumbnail }} />
                </View>
                <Title style={styles.title}>{item.title}</Title>
                <Text style={styles.text}>Description: {item.description}</Text>
                <Text style={styles.text}>Price: ${item.price}</Text>
            </Card.Content>
            <Card.Actions>
                <Button title="Detail" onPress={() => handleDetail(item)} />
            </Card.Actions>
        </Card>
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {selectedProduct ? (
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: selectedProduct.thumbnail }} />
                    </View>

                    <Title style={styles.title}>{selectedProduct.title}</Title>
                    <Text style={styles.text}>Description: {selectedProduct.description}</Text>
                    <Text style={styles.text}>Price: ${selectedProduct.price}</Text>
                    <Text style={styles.text}>Discount: {selectedProduct.discountPercentage}%</Text>
                    <Text style={styles.text}>Rating: {selectedProduct.rating}</Text>
                    <Button title="Close" onPress={clearDetail} />
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => <RenderItemWithCard item={item} />}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                />
            )}
        </SafeAreaView>
    );
};

export default SearchProduct;

const styles = StyleSheet.create({
    cardContent: {
        alignItems: 'left',
        marginBottom: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 380,
        height: 200,
    },
    text: {
        color: 'black',
        fontSize: 15,
    },
    title: {
        color: 'black',
        fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'left',
        backgroundColor: 'white',
        padding: 10,
    }
});