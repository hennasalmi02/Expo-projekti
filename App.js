import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("Guess a number between 1 and 100");
  const [guesses, setGuesses] = useState(0)

  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  
  const checkGuess = () => {
    const number = Number(input);
    const newGuesses = guesses + 1;
    setGuesses(newGuesses);

  
    if (number > randomNumber) {
      setMsg("Your guess " + number + " is too high");
    } else if (number < randomNumber) {
      setMsg("Your guess " + number + " is too low");
    } else {
      setMsg("Correct!");
      alert("You guessed the number in " + newGuesses + " guesses");
  
      setRandomNumber(Math.floor(Math.random() * 100) + 1);
      setInput("");
      setGuesses(0);
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{msg}</Text>   
        <TextInput
        placeholder='Enter a number'
        keyboardType="numeric"
        onChangeText={input => setInput(input)} 
        value={input}/>
      </View>
      <View>
        <Button onPress={checkGuess} title="Make guess" />
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
