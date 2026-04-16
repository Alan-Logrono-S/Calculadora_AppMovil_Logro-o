import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { CalcButton } from '../components/CalcButton';

export default function CalculatorApp() {
  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);

  const handlePress = (value: string) => {
    if (value === 'C') {
      setCurrentValue('0');
      setOperator(null);
      setPreviousValue(null);
      return;
    }

    if (value === 'del') {
      setCurrentValue(currentValue.length > 1 ? currentValue.slice(0, -1) : '0');
      return;
    }

    if (value === '+/-') {
      setCurrentValue((parseFloat(currentValue) * -1).toString());
      return;
    }

    if (['÷', 'x', '-', '+'].includes(value)) {
      setOperator(value);
      setPreviousValue(currentValue);
      setCurrentValue('0');
      return;
    }

    if (value === '=') {
      if (!operator || !previousValue) return;
      const current = parseFloat(currentValue);
      const previous = parseFloat(previousValue);
      let result = 0;

      switch (operator) {
        case '÷': result = previous / current; break;
        case 'x': result = previous * current; break;
        case '-': result = previous - current; break;
        case '+': result = previous + current; break;
      }

      setCurrentValue(result.toString());
      setOperator(null);
      setPreviousValue(null);
      return;
    }

    if (currentValue === '0' && value !== '.') {
      setCurrentValue(value);
    } else {
      if (value === '.' && currentValue.includes('.')) return;
      setCurrentValue(currentValue + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.historyText}>
          {previousValue} {operator} {operator ? currentValue : ''}
        </Text>
        <Text style={styles.displayText}>{currentValue}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <CalcButton title="C" type="action" onPress={handlePress} />
          <CalcButton title="+/-" type="action" onPress={handlePress} />
          <CalcButton title="del" type="action" onPress={handlePress} />
          <CalcButton title="÷" type="operator" onPress={handlePress} />
        </View>
        <View style={styles.row}>
          <CalcButton title="7" onPress={handlePress} />
          <CalcButton title="8" onPress={handlePress} />
          <CalcButton title="9" onPress={handlePress} />
          <CalcButton title="x" type="operator" onPress={handlePress} />
        </View>
        <View style={styles.row}>
          <CalcButton title="4" onPress={handlePress} />
          <CalcButton title="5" onPress={handlePress} />
          <CalcButton title="6" onPress={handlePress} />
          <CalcButton title="-" type="operator" onPress={handlePress} />
        </View>
        <View style={styles.row}>
          <CalcButton title="1" onPress={handlePress} />
          <CalcButton title="2" onPress={handlePress} />
          <CalcButton title="3" onPress={handlePress} />
          <CalcButton title="+" type="operator" onPress={handlePress} />
        </View>
        <View style={styles.row}>
          <CalcButton title="0" isWide onPress={handlePress} />
          <CalcButton title="." onPress={handlePress} />
          <CalcButton title="=" type="operator" onPress={handlePress} />

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    padding: 20,
    alignItems: 'flex-end',
  },
  historyText: {
    color: '#A5A5A5',
    fontSize: 40,
    marginBottom: 10,
  },
  displayText: {
    color: '#FFFFFF',
    fontSize: 70,
    fontWeight: '300',
  },
  buttonsContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});