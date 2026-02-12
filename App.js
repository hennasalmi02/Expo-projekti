import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';

function App() {

  const [keyword, setKeyword] = useState('');
  const [receipts, setReceipts] = useState([]);

  const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch:" + response.statusText);
      
      return response.json()
    })
    .then(data => setReceipts(data.meals))
    .catch(err => console.error(err));    
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder='keyword'
          value={keyword}
          onChangeText={text => setKeyword(text)} />
      </View>
      <View style={styles.container}>
        <Button title="Find" onPress={handleFetch} />
        <FlatList
          data={receipts}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => <View>
            <Text style={{ fontSize: 18, fontWeight: "bold"  }}>
              {item.strMeal}
            </Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.strMealThumb }}
            />
          </View>} />
      </View></>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#333',
  },
};

export default App;