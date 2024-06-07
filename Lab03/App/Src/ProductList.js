import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import styles from "./styles";
import { Button } from "react-native-paper";

const FlatListBasics = () => {
    const [data, setData] = useState([])
    const filePath = 'http://10.40.254.30:8080/data/listening/lis_ques/get/1';
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
            {/* <FlatList
                data={data}
                renderItem={({ item }) => <RenderItem data={item} />}
                keyExtractor={item => item.id}
            /> */}
            <Button onPress={console.log(data)}>sdasds</Button>
        </SafeAreaView>
    );
};
export default FlatListBasics