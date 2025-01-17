import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

export default function App() {
  const [income, setIncome] = useState('');
  const [tax, setTax] = useState('');

  const calculator = () => {
    const incomeAmount = parseFloat(income);

    if (incomeAmount < 0 || isNaN(incomeAmount)) {
      Alert.alert('Invalid income');
      return;
    }

    let taxAmount = 0;
    if (incomeAmount <= 10000000) {
      taxAmount = incomeAmount * 0.1;
    } else if (incomeAmount <= 50000000) {
      taxAmount = 10000000 * 0.1 + (incomeAmount - 10000000) * 0.2;
    } else {
      taxAmount =
        10000000 * 0.1 + 40000000 * 0.2 + (incomeAmount - 50000000) * 0.3;
    }

    setTax(`Income TAX: ${taxAmount.toFixed(2)}VND`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INCOME TAX CALCULATOR</Text>
      <TextInput
        style={styles.input}
        value={income}
        textAlign="center"
        placeholder="Enter your income"
        onChangeText={text => setIncome(text)}
      />
      <TouchableOpacity style={styles.button} onPress={calculator}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      <Text style={styles.result}>{tax}</Text>
    </View>
  );
};

