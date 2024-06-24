import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useNavigation } from "@react-navigation/native";

const MenuComponent = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Menu>
                <MenuTrigger style={styles.menuContainer}>
                    <Text style={styles.text}>...</Text>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => navigation.navigate('Update')}>
                        <Text style={styles.text}>Update</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => navigation.navigate('Delete')}>
                        <Text style={styles.text}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    menuContainer: {
        marginLeft: 270,
        padding: 10,
    },
    text: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 20,
    },
});

export default MenuComponent;
