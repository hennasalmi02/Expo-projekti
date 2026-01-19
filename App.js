import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

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
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>This is text</Text>   
      </View>
      <View style={{flex: 2}}>
        <TextInput
        placeholder='Enter a number'
        onChangeText={number1 => setNumber1(number1)} 
        value={number1}/>
        <TextInput
        placeholder='Enter a number'
        onChangeText={number2 => setNumber2(number2)} 
        value={number2}/>  
      </View>
      <View style={{flex: 1}}>
        <Button onPress={sum} title="+" />
        <Button onPress={difference} title="-" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
