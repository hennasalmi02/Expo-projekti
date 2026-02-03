import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

function HistoryScreen({ route }) {
    const { calcs } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History Screen</Text>
      <FlatList 
          data={calcs} 
          renderItem={({item}) => <Text>{item.key}</Text>} 
        />
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

export default HistoryScreen;
