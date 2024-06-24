import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailScreen = () => {
    const route = useRoute();
    const { comic } = route.params;
    const navigation = useNavigation();
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        checkIfBookmarked();
    }, []);

    const checkIfBookmarked = async () => {
        try {
            const bookmarks = await getBookmarks();
            setBookmarked(bookmarks.includes(comic.comicId.toString()));
        } catch (error) {
            console.log('Error checking bookmark:', error);
        }
    };

    const getBookmarks = async () => {
        try {
            const storedBookmarks = await AsyncStorage.getItem('@bookmarks');
            if (storedBookmarks) {
                return JSON.parse(storedBookmarks);
            }
            return [];
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            return [];
        }
    };

    const toggleBookmark = async () => {
        try {
            const bookmarks = await getBookmarks();
            const comicId = comic.comicId.toString();
    
            let updatedBookmarks;
            if (bookmarks.includes(comicId)) {
                updatedBookmarks = bookmarks.filter(id => id !== comicId);
                await AsyncStorage.setItem('@bookmarks', JSON.stringify(updatedBookmarks));
                setBookmarked(false);
                Alert.alert('Bookmark Removed');
            } else {
                updatedBookmarks = [...bookmarks, comicId];
                await AsyncStorage.setItem('@bookmarks', JSON.stringify(updatedBookmarks));
                setBookmarked(true);
                Alert.alert('Bookmark Added');
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            Alert.alert('Failed to toggle bookmark');
        }
    };

    const renderChapter = ({ item }) => (
        <TouchableOpacity style={styles.chapterContainer}
            onPress={() => navigation.navigate('ReadingScreen', { chapter: item, chapters: comic.chapters })}
        >
            <Text style={styles.comicTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    const HeaderList = () => {
        return (
            <View style={styles.container}>
                <View style={styles.latestComicContainer}>
                    <ImageBackground
                        source={{ uri: comic.coverImage }}
                        style={styles.backgroundImage}
                        imageStyle={{ opacity: 0.3 }}
                    >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={styles.coverContainer}>
                                <Image
                                    source={{ uri: comic.coverImage }}
                                    style={styles.coverImage}
                                />
                                <TouchableOpacity onPress={toggleBookmark} style={{ marginTop: 10 }}>
                                    <FontAwesome5 name={bookmarked ? 'check-square' : 'bookmark'} size={40} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>{comic.title}</Text>
                                <View style={styles.itemContainer}>
                                    <Text style={styles.comicTitle}>Author:</Text>
                                    <Text style={styles.comicDescription}>{comic.author.name}</Text>
                                </View>
                                <View style={styles.itemContainer}>
                                    <Text style={styles.comicTitle}>Genre:</Text>
                                    <Text style={styles.comicDescription}>{comic.genre.name}</Text>
                                </View>
                                <View style={styles.itemContainer}>
                                    <Text style={styles.comicTitle}>Publish Date:</Text>
                                    <Text style={styles.comicDescription}>{new Date(comic.publishDate).toDateString()}</Text>
                                </View>
                                <View style={styles.itemContainer}>
                                    <Text style={styles.comicTitle}>Status:</Text>
                                    <Text style={styles.comicDescription}>{comic.status}</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#262626',
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: 10,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                }}>
                    <Text style={styles.comicDescription}>{comic.description}</Text>
                </View>
                <Text style={styles.latestComicTitle}>Chapters</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={<HeaderList />}
                data={comic.chapters}
                renderItem={renderChapter}
                keyExtractor={(item) => item.chapterId.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
    },
    latestComicContainer: {
        flex: 1,
        marginBottom: 15,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    coverContainer: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    coverImage: {
        width: 120,
        height: 140,
        marginTop: 10,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#262626',
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    comicTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 2,
    },
    comicDescription: {
        color: 'white',
        fontSize: 15,
    },
    latestComicTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        marginLeft: 10,
    },
    chapterContainer: {
        padding: 10,
        backgroundColor: '#262626',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
});

export default DetailScreen;
