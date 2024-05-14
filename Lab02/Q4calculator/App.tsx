import React, { useState } from 'react';
import styles from './styles';
import { Text, Touchable, TouchableOpacity, View } from 'react-native';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');

  const handleNumberInput = num => {
    const newDisplayValue = displayValue === '0' ? num.toString() : displayValue + num;
    setDisplayValue(newDisplayValue);
  };

  const handleOperatorInput = operator => {
    operator = String(operator);
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    if (operator === '+') {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === '-') {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === 'x') {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === '/') {
      setDisplayValue((num1 / num2).toString());
    }
    setOperator(null);
    setFirstValue('');
  };
  
  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerDisplay}>
        <Text style={styles.display}>{displayValue}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(1)}>
          <Text style={styles.numberText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(2)}>
          <Text style={styles.numberText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(3)}>
          <Text style={styles.numberText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOperatorInput('/')}>
          <Text style={styles.funtionText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(4)}>
          <Text style={styles.numberText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(5)}>
          <Text style={styles.numberText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(6)}>
          <Text style={styles.numberText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOperatorInput('x')}>
          <Text style={styles.funtionText}>x</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(7)}>
          <Text style={styles.numberText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(8)}>
          <Text style={styles.numberText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberInput(9)}>
          <Text style={styles.numberText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOperatorInput('-')}>
          <Text style={styles.funtionText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonOperate} onPress={handleEqual}>
          <Text style={styles.operateText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonZero}
          onPress={() => handleNumberInput(0)}>
          <Text style={styles.numberText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonClear} onPress={handleClear}>
          <Text style={styles.numberText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOperatorInput('+')}>
          <Text style={styles.funtionText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default App;
