import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTransactionScreen = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [token, setToken] = useState(null);
    const filePath = 'https://kami-backend-5rs0.onrender.com/customers';
    const navigation = useNavigation();

    const [services, setServices] = useState([
        { id: 1, name: 'Lột mụn đầu đen', price: 40000, quantity: 1, selected: false, executor: null },
        { id: 2, name: 'Gội đầu', price: 20000, quantity: 1, selected: false, executor: null },
        { id: 3, name: 'Đánh răng', price: 0, quantity: 1, selected: false, executor: null },
        { id: 4, name: 'Trị mụn', price: 0, quantity: 1, selected: false, executor: null },
        { id: 5, name: 'Tắm trắng', price: 0, quantity: 1, selected: false, executor: null },
    ]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setToken(await AsyncStorage.getItem('token'));
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            const formattedCustomers = jsonData.map(customer => ({
                label: customer.name,
                value: customer._id,
            }));
            setCustomers(formattedCustomers);
            console.log(customers);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleSelectService = (serviceId) => {
        const updatedServices = services.map(service => {
            if (service.id === serviceId) {
                return { ...service, selected: !service.selected };
            }
            return service;
        });
        setServices(updatedServices);
    };

    const handleQuantityChange = (serviceId, increment) => {
        const updatedServices = services.map(service => {
            if (service.id === serviceId && service.selected) {
                const newQuantity = service.quantity + increment;
                return { ...service, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return service;
        });
        setServices(updatedServices);
    };

    const handleSubmitTransaction = async () => {
        try {
            const selectedServices = services.filter(service => service.selected).map(service => ({
                _id: service.id,
                quantity: service.quantity,
                userID: selectedCustomer,
            }));

            const payload = {
                CustomerId: selectedCustomer,
                Services: selectedServices,
            };

            test();
            console.log(payload);

            const response = await fetch(filePath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Transaction submitted successfully');
            navigation.navigate('TransactionSuccessScreen');
        } catch (error) {
            console.error('Error submitting transaction', error);
        }
    };

    const totalPrice = services.reduce((sum, service) => {
        if (service.selected) {
            return sum + (service.price * service.quantity);
        }
        return sum;
    }, 0);

    const test = () => {
        console.log(token)
        console.log(selectedCustomer)

    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Customer *</Text>
            <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={customers}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder='Select customer'
                searchPlaceholder="Search..."
                value={selectedCustomer}
                onChange={item => {
                    setSelectedCustomer(item.value);
                }}
                itemTextStyle={styles.itemText}
            />
            {services.map(service => (
                <View key={service.id} style={styles.serviceContainer}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 10,
                    }}>
                        <BouncyCheckbox
                            isChecked={service.selected}
                            onPress={() => handleSelectService(service.id)}
                            fillColor="green"
                        />
                        <Text style={styles.serviceName}>{service.name}</Text>
                    </View>
                    {service.selected && (
                        <View style={{
                            flex: 1,
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row', alignItems: 'center', width: '100%',
                            }}>
                                <TouchableOpacity
                                    style={styles.quantityContainer}
                                    onPress={() => handleQuantityChange(service.id, -1)}>
                                    <Text style={{ color: 'black' }}>-</Text>
                                </TouchableOpacity >
                                <View style={styles.quantityContainer}>
                                    <Text style={styles.quantityText}>{service.quantity}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.quantityContainer}
                                    onPress={() => handleQuantityChange(service.id, 1)}>
                                    <Text style={{ color: 'black' }}>+</Text>
                                </TouchableOpacity>
                                <Dropdown
                                    style={{
                                        flex: 5,
                                        height: '100%',
                                        borderColor: 'gray',
                                        borderWidth: 0.5,
                                        borderRadius: 8,
                                        paddingHorizontal: 8,
                                        width: '50%'
                                    }}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    data={[
                                        { label: 'Executor', value: 'executor' },
                                        { label: 'Executor 2', value: 'executor2' },
                                        { label: 'Executor 3', value: 'executor3' },
                                    ]}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder='Executor'
                                    value="executor"
                                    onChange={item => {
                                    }}
                                    itemTextStyle={styles.itemText}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.priceText}>Price: {service.price.toLocaleString()} đ</Text>
                            </View>
                        </View>
                    )}
                </View>
            ))}

            <TouchableOpacity onPress={handleSubmitTransaction} style={styles.submitButton}>
                <Text style={styles.totalPrice}>Total Price: {totalPrice.toLocaleString()} đ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={test} style={styles.submitButton}>
                <Text style={styles.totalPrice}>test</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default AddTransactionScreen;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    itemText: {
        color: 'black',
        fontSize: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 16,
        color: '#000',
    },
    placeholderStyle: {
        color: 'black',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: 'black',
        fontSize: 16,
    },
    inputSearchStyle: {
        color: 'black',
        height: 40,
        fontSize: 16,
    },
    serviceContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    serviceName: {
        fontSize: 16,
        marginLeft: 8,
        color: 'black',
    },
    quantityContainer: {
        flex: 1,
        height: '100%',
        width: '10%',
        alignItems: 'center',
        marginLeft: 'auto',
        borderWidth: 1

    },
    quantityText: {
        marginHorizontal: 8,
        fontSize: 16,
        color: 'black',
    },
    priceText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#ff6666',
    },
    totalPrice: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
