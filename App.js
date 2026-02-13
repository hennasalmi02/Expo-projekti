import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function App() {

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [converted, setConverted] = useState('');


  const handleFetch = () => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText);
        return response.json();
      })
      .then(data => {
        const rate = data.eur[currency];
        const result = parseFloat(amount) * rate;
        setConverted(result.toFixed(2));
      })
      .catch(err => console.error(err));
  }
  

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Currency Converter</Text>
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder='Enter amount'
          value={amount}
          onChangeText={text => setAmount(text)} />
        <Picker
          style={{ width: 200, marginTop: 20 }}
          selectedValue={currency}
          pickerStyleType="dropdown"
          onValueChange={(itemValue) => setCurrency(itemValue)}>
          <Picker.Item label="Select currency" value="" />
          <Picker.Item label="USD" value="usd" />
          <Picker.Item label="GBP" value="gbp" />
          <Picker.Item label="JPY" value="jpy" />
          <Picker.Item label="AUD" value="aud" />
          <Picker.Item label="CAD" value="cad" />
          <Picker.Item label="CHF" value="chf" />
          <Picker.Item label="CNY" value="cny" />
          <Picker.Item label="SEK" value="sek" />
          <Picker.Item label="NZD" value="nzd" />
        </Picker>
          
      </View>
      <View style={styles.container}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>{converted} €</Text>
        <Button title="Convert" onPress={handleFetch} />
      </View>
    </View>
  );
}

const styles = {
  container: {
    alignItems: 'center',
  },
};

export default App;