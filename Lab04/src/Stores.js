import { v4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const mapContacts = (contact) => {
    const { name, picture, phone, cell, email } = contact;
    return {
        id: v4(),
        name: name.first + ' ' + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() < 0.1 ? true : false,
    };
};

export const fetchContactsSuccess = (contacts) => {
    return AsyncStorage.setItem('contacts', JSON.stringify(contacts));
};

export const loadContacts = async () => {
    try {
        const contactsJSON = await AsyncStorage.getItem('contacts');
        if (contactsJSON !== null) {
            return JSON.parse(contactsJSON);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error loading contacts:', error);
        return [];
    }
};
