import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const db = SQLite.openDatabaseSync('productdb');

  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);

  const initialize = async () => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);
      `);
    } catch (error) {
      console.error('Could not open database', error);
    }
  }

  useEffect(() => 
    { initialize();
      updateList();
     }, []);

  const saveItem = async () => {
    try {
      await db.runAsync('INSERT INTO product (product, amount) VALUES (?, ?)', product, amount);
      await updateList();
    } catch (error) {
      console.error('Could not add item', error);
    }
  };

  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from product');
      setItems(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }

  const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM product WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Shopping list</Text>   
      <TextInput 
        placeholder='Product' 
        onChangeText={product => setProduct(product)}
        value={product}/> 
      <TextInput 
        placeholder='Amount' 
        keyboardType='numeric' 
        onChangeText={amount => setAmount(amount)}
        value={amount}/> 
      <Button onPress={saveItem} title="Save" />
      <FlatList
        style={{ width: '100%' }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
        <View>
          <Text>{item.product}</Text>
          <Text>{item.amount} </Text>
          <Text style={{ color: '#ff0000' }} onPress={() => deleteItem(item.id)}>bought</Text>
        </View>
      }
      data={items}
      />
    </View>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    padding: 50,
  },
});
