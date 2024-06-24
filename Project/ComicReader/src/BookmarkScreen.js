import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const BookmarkScreen = ({ navigation }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [bookmarkedComics, setBookmarkedComics] = useState([]);

    useEffect(() => {
        loadBookmarks();
    }, []);

    useEffect(() => {
        fetchBookmarkedComics();
    }, [bookmarks]);

    const loadBookmarks = async () => {
        try {
            const storedBookmarks = await AsyncStorage.getItem('@bookmarks');
            if (storedBookmarks) {
                const bookmarksData = JSON.parse(storedBookmarks);
                setBookmarks(bookmarksData);
            }
        } catch (error) {
            console.error('Error loading bookmarks:', error);
        }
    };

    const fetchBookmarkedComics = async () => {
        const detailedComics = [];
        try {
            for (const comicId of bookmarks) {
                const response = await fetch(`http://10.40.11.133:3031/api/Comics/${comicId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comic details');
                }
                const comicData = await response.json();
                detailedComics.push(comicData);
            }
            setBookmarkedComics(detailedComics);
        } catch (error) {
            console.error('Error fetching comic details:', error);
            Alert.alert('Failed to fetch comic details');
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    };

    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('Detail', { comic: item })}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.coverImage }}
                        style={styles.image}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.comicTitle}>{truncateText(item.title, 25)}</Text>
                    <Text style={styles.infoText}>Status: {item.status}</Text>
                    <Text style={styles.infoText}>Genres: {item.genre.name}</Text>
                    <Text style={styles.descriptionText}>{truncateText(item.description, 180)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bookmarked Comics</Text>
            <FlatList
                data={bookmarkedComics}
                renderItem={RenderItem}
                keyExtractor={(item) => item.comicId.toString()}
                contentContainerStyle={{ paddingVertical: 10 }}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No bookmarks found</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#262626',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    imageContainer: {
        width: 100,
        height: 150,
        borderRadius: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    comicTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    descriptionText: {
        color: 'white',
        fontSize: 13,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: 'gray',
        fontSize: 16,
    },
});

export default BookmarkScreen;
