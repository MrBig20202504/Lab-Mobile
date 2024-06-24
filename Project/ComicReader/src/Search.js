import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://10.40.11.133:3031/api/Comics');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonResponse = await response.json();
            setData(jsonResponse);
            setFilteredData(jsonResponse);
            setLoading(false);
            console.log("Fetch successful");
        } catch (error) {
            console.log("Error fetching data:", error.toString());
            setLoading(false);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filteredData = data.filter(item =>
            item.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filteredData);
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
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.coverImage }}
                        style={styles.image}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.comicTitle}>{truncateTitle(item.title, 25)}</Text>
                    <Text style={styles.infoText}>Status: {item.status}</Text>
                    <Text style={styles.infoText}>Genres: {item.genre.name}</Text>
                    <Text style={styles.descriptionText}>{truncateTitle(item.description, 180)}</Text>
                </View>
            </TouchableOpacity >
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FontAwesome5 name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search comics"
                    placeholderTextColor="gray"
                    onChangeText={handleSearch}
                    value={searchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
                    <FontAwesome5 name="arrow-right" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredData}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={item => (item.comicId ? item.comicId.toString() : null)}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No comics found</Text>
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
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#262626',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        paddingVertical: 10,
    },
    searchButton: {
        backgroundColor: '#262626',
        padding: 10,
        borderRadius: 5,
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

export default SearchScreen;
