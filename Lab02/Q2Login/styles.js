import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 48,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#E14C2C',
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        marginTop: 20,
        marginLeft: 0,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#E14C2C',
        borderRadius: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});