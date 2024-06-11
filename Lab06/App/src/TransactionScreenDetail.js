import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const TransactionDetailScreen = ({ route }) => {
    const { data } = route.params;
    const totalCost = data.services.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    const formatNumber = (num) => {
        const maxLength = 12;
        const numString = num.toString();
        if (numString.length > maxLength) {
            return numString.substring(0, maxLength - 3) + '...';
        }
        return numString;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#D8C2E0' }}>
            <View style={styles.container}>
                <Text style={styles.title}>General information</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.text}>Transaction code</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.dataText}>{data.id}</Text>
                    </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.text}>Customer</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.dataText}>{data.customer.name} - {data.customer.phone}</Text>
                    </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.text}>Creation time</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.dataText}>{new Date(data.customer.createdAt).toLocaleString()}</Text>
                    </View>

                </View>
            </View>

            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Services list: </Text>
                </View>
                <FlatList
                    data={data.services}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>

                            <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.text}>x{item.quantity}</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text style={styles.dataText}>{item.price * item.quantity} đ</Text>
                            </View>

                        </View>
                    )}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.text}>total:</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.dataText}>{totalCost} đ</Text>
                    </View>

                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Cost: </Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.text}>Amount of money:</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.dataText}>{data.priceBeforePromotion} đ</Text>
                    </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.5 }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.text}>Discount:</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.dataText}>-{formatNumber(data.priceBeforePromotion - data.price)} đ</Text>
                    </View>

                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.text}>Total:</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.title}>{data.price} đ</Text>
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "left",
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        marginHorizontal: 10,

    },
    bottomContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "left",
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: '#A349A4',
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        color: '#6E6E6E',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dataText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
});

export default TransactionDetailScreen;
