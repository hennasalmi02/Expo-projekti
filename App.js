import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const [result, setResult] = useState(0);

  const sum = () => {
    return (
      "Result: " + (parseFloat(number1) + parseFloat(number2))
    );
  }

  const difference = () => {
    return (
      "Result: " + (parseFloat(number1) - parseFloat(number2))
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{result}</Text>   
        <TextInput
        placeholder='Enter a number'
        onChangeText={number1 => setNumber1(number1)} 
        value={number1}/>
        <TextInput
        placeholder='Enter a number'
        onChangeText={number2 => setNumber2(number2)} 
        value={number2}/>  
      </View>
      <View>
        <Button onPress={result => setResult(sum)} title="+" />
        <Button onPress={result => setResult(difference)} title="-" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
