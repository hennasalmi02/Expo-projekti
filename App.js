import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const [calc, setCalc] = useState("");
  const [calcs, setCalcs] = useState([]);

  const [result, setResult] = useState("");

  const handleSum = () => {
    const calculation = `${number1} - ${number2} = ${parseFloat(number1) - parseFloat(number2)}`;
    setResult("Result: " + (parseFloat(number1) - parseFloat(number2)));
    setCalcs([...calcs, { key: calculation }]);

    setCalc("");
  }

  const handleDifference = () => {
    const calculation = `${number1} + ${number2} = ${parseFloat(number1) + parseFloat(number2)}`;
    setResult("Result: " + (parseFloat(number1) + parseFloat(number2)));
    setCalcs([...calcs, { key: calculation }]);

    setCalc("");
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{result}</Text>   
        <TextInput
        placeholder='Enter a number'
        keyboardType="numeric"
        onChangeText={number1 => setNumber1(number1)} 
        value={number1}/>
        <TextInput
        placeholder='Enter a number'
        keyboardType="numeric"
        onChangeText={number2 => setNumber2(number2)} 
        value={number2}/>  
      </View>
      <View>
        <Button onPress={handleSum} title="+" />
        <Button onPress={handleDifference} title="-" />
        <FlatList 
          data={calcs} 
          renderItem={({item}) => <Text>{item.key}</Text>} 
        />
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
