import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ContactThumbnail from './ContactThum';
import { loadContacts } from './Stores';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const loadFavoriteContacts = async () => {
            const loadedContacts = await loadContacts();
            setContacts(loadedContacts);
        };
        loadFavoriteContacts();
    }, []);

    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigation.navigate('ProfileContact', { contact: item })}
            />
        );
    };

    const favorites = contacts.filter((contact) => contact.favorite);

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={keyExtractor}
                numColumns={3}
                contentContainerStyle={styles.list}
                renderItem={renderFavoriteThumbnail}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        alignItems: 'center',
    },
});

export default Favorites;
