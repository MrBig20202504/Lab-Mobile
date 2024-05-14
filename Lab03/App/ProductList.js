import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import styles from "./styles";

const FlatListBasics = () => {
    const [data, setData] = useState([])
    const filePath = 'https://dummyjson.com/products';z
    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response) {
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
    });

    const RenderItem = ({ data }) => (
        <View style={styles.container}>
            <View>
                <Image style={styles.img} source={{ uri: data.thumbnail }} />
            </View>
            <View style = {styles.view}>
                <Text style={styles.title}>Title: {data.title}</Text>
                <Text style={styles.description}>Description: {data.description}</Text>
                <Text style={styles.price}>Price: {data.price}</Text>
                <Text style={styles.discountPercentage}>DiscountPercentage: {data.discountPercentage}</Text>
                <Text style={styles.rating}>Rating: {data.rating}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.FlatListBasicsContainer}>
            <FlatList
                data={data}
                renderItem={({ item }) => <RenderItem data={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};
export default FlatListBasics