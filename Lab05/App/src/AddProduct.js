import React, { useEffect, useState } from "react";
import { Button, TextInput, View, Text } from "react-native";

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [rating, setRating] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState('');

    const handleSubmit = () => {
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                discountPercentage: discountPercentage,
                rating: rating,
                stock: stock,
                brand: brand,
                category: category,
                images: images,
            }),
        })
            .then((res) => res.json())
            .then(console.log);
        Alert.alert("Add sucessfull")
    };

    return (
        <View style={styles.addProductContainer}>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    textAlign="left"
                    placeholder="Please enter title"
                    placeholderTextColor={'black'}
                    onChangeText={text => setTitle(text)}
                />
            </View>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    textAlign="left"
                    placeholder="Please enter description"
                    placeholderTextColor={'black'}
                    onChangeText={text => setDescription(text)}
                />
            </View>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>Price</Text>
                <TextInput
                    style={styles.input}
                    value={price}
                    textAlign="left"
                    placeholder="Please enter price"
                    placeholderTextColor={'black'}
                    onChangeText={text => setPrice(text)}
                />
            </View>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>DiscountPercentage</Text>
                <TextInput
                    style={styles.input}
                    value={discountPercentage}
                    textAlign="left"
                    placeholder="Please enter discount percentage"
                    placeholderTextColor={'black'}
                    onChangeText={text => setDiscountPercentage(text)}
                />
            </View>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>Rating</Text>
                <TextInput
                    style={styles.input}
                    value={rating}
                    textAlign="left"
                    placeholder="Please enter rating"
                    placeholderTextColor={'black'}
                    onChangeText={text => setRating(text)}
                />
            </View>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>Stock</Text>
                <TextInput
                    style={styles.input}
                    value={stock}
                    textAlign="left"
                    placeholder="Please enter stock"
                    placeholderTextColor={'black'}
                    onChangeText={text => setStock(text)}
                />
            </View>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>Brand</Text>
                <TextInput
                    style={styles.input}
                    value={brand}
                    textAlign="left"
                    placeholder="Please enter brand"
                    placeholderTextColor={'black'}
                    onChangeText={text => setBrand(text)}
                />
            </View>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>Category</Text>
                <TextInput
                    style={styles.input}
                    value={category}
                    textAlign="left"
                    placeholder="Please enter category"
                    placeholderTextColor={'black'}
                    onChangeText={text => setCategory(text)}
                />
            </View>

            <View style={styles.minorAddProductContainer}>
                <Text style={styles.addTitle}>Images</Text>
                <TextInput
                    style={styles.input}
                    value={images}
                    textAlign="left"
                    placeholder="Please enter images URL"
                    placeholderTextColor={'black'}
                    onChangeText={text => setImages(text)}
                />
            </View>

            <Button
                style={styles.Button}
                onPress={handleSubmit}
                title="SUBMIT"
            >
            </Button>
        </View>
    );
};

export default AddProduct;