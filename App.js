import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue } from "firebase/database";

export default function App() {

  const database = getDatabase(app);
  const [product, setProduct] = useState({
  title: '',
  amount: ''
  });
  const [items, setItems] = useState([]);

  const handleSave = () => {
    if (product.amount && product.title) {
      push(ref(database, 'items/'), product);
    }
    else {
      Alert.alert('Error', 'Type product and amount first');
    }
  }

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setItems(Object.values(data));
      } else {
        setItems([]);
      }
    })
  }, []);

  const styles = StyleSheet.create({
    listcontainer: {
      padding: 10,
      marginTop: 50
    }
   });

  return (  
    <View style={styles.listcontainer}>
      <TextInput 
        placeholder='Product title' 
        onChangeText={text => setProduct({...product, title: text})}
        value={product.title}/>  
      <TextInput 
        placeholder='Amount' 
        onChangeText={text => setProduct({...product, amount: text})}
        value={product.amount}/>   
      <Button onPress={handleSave} title="Save" /> 
      <FlatList 
        renderItem={({item}) => 
          <View style={styles.listcontainer}>
            <Text style={{fontSize: 18}}>{item.title}, {item.amount}</Text>
          </View>} 
        data={items} />      
    </View>
  );
}

