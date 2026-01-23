import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {

  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const handlePress = () => {
    setItems([...items, { key: item }]);
    setItem("");
  }

  const handleClear = () => {
    setItems([]);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Shopping list</Text>   
        <TextInput
          placeholder='Enter an item'
          onChangeText={text => setItem(text)} 
          value={item}/>
      </View>
      <View>
        <Button onPress={handlePress} title="Add" />
        <Button onPress={handleClear} title="Clear" />
        <FlatList 
          data={items} 
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
