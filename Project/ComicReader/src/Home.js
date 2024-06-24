import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const navigation = useNavigation();
    const [latestComic, setLatestComic] = useState(null);
    const filepath = 'http://192.168.1.8:3031/api/Comics';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://10.40.11.133:3031/api/Comics');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonResponse = await response.json();
                setData(jsonResponse);
                findLatestComic(jsonResponse);
                setLoading(false); // Set loading to false after data fetch
                console.log("Fetch successful");
            } catch (error) {
                console.log("Error fetching data:", error.toString());
                setLoading(false); // Ensure loading is set to false even on error
            }
        };

        fetchData();
    }, []);

    const findLatestComic = (comics) => {
        if (comics.length === 0) return;
        let latest = comics[0];
        comics.forEach(comic => {
            if (new Date(comic.publishDate) > new Date(latest.publishDate)) {
                latest = comic;
            }
        });
        setLatestComic(latest);
    };

    const RenderItem = ({ item }) => {
        const truncateTitle = (title, maxLength) => {
            if (title.length > maxLength) {
                return title.substring(0, maxLength - 3) + '...';
            }
            return title;
        };

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('Detail', { comic: item })}
            >
                <View style={{
                    flex: 0.5,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}>
                    <Image
                        source={{ uri: item.coverImage }}
                        style={styles.image}
                    />
                </View>

                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <Text style={styles.comicTitle}>{truncateTitle(item.title, 25)}</Text>

                    <Text style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                    }}>Status: {item.status}</Text>
                    <Text style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                    }}>Genres: {item.genre.name}</Text>
                    <Text style={{
                        color: 'white',
                        fontSize: 13,
                    }}>{truncateTitle(item.description, 180)}</Text>
                </View>
            </TouchableOpacity >
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.latestComicContainer}>
                <ImageBackground
                    source={{ uri: latestComic.coverImage }}
                    style={styles.backgroundImage}
                    imageStyle={{ opacity: 0.3 }}
                >
                    <Text style={styles.latestComicTitle}>Latest Upload Comic</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={styles.coverContainer}>
                            <Image
                                source={{ uri: latestComic.coverImage }}
                                style={styles.coverImage}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.latestComicTitleText}>{latestComic.title}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <RenderItem item={item} />}
                    keyExtractor={item => (item.comicId ? item.comicId.toString() : null)}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No comics found</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView >
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
    },
    image: {
        width: 110,
        height: 140,
        resizeMode: 'stretch',
        borderRadius: 10,
    },
    latestComicTitleText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 25,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#262626',
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1,
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
    },
    comicDescription: {
        color: 'white',
        fontSize: 15,
    },
    comicTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        color: 'black',
        fontSize: 16,
    },
    latestComicContainer: {
        flex: 0.7,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    coverContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    coverImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    latestComicTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
