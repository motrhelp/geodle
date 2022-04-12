import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';

import flag from './img/512px-Flag_of_the_Netherlands.png'
import countriesList from './CountriesList';

function GameContainer() {

  const [guess, setGuess] = useState("");
  const [autocompleteData, setAutocompleteData] = useState();

  const guessesData = [
    {
      flag: '🇿🇦',
      name: 'South Africa',
      direction: '↙️',
      distance: '1000'
    },
    {
      flag: '🇧🇾',
      name: 'Belarus',
      direction: '✅',
      distance: '0'
    }
  ]

  // Put a character or country name in the guess container, updating both guess and autocompleteData variables.
  const enterGuess = (text) => {
    setGuess(text);
    if (text == "") {
      setAutocompleteData();
    } else {
      setAutocompleteData(countriesList.filter((country) => country.name.startsWith(text)))
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.gameContainer}
      behavior='padding'
    >
      <Image
        style={styles.flag}
        source={flag}
      />
      <View style={styles.guessesContainer}>
        <FlatList
          data={guessesData}
          renderItem={({ item }) => <Text style={styles.item}>{item.flag} {item.name}     {item.direction} {item.distance} km</Text>}
          keyExtractor={(item, index) => index.toString()}  // This is just to remove keys warning
        />
      </View>

      {/* Autocomplete */}
      <View style={styles.inputWithAutocompleteContainer}>
        <View style={styles.autocompleteContainer}>
          {autocompleteData?.length == 0 ?
            null
            :
            <FlatList
              data={autocompleteData}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onPress={() => enterGuess(item.name)}
                >
                  <Text style={styles.autocompleteItem}>{item.name}</Text>
                </TouchableOpacity>
              }
              keyboardShouldPersistTaps={'handled'} // Avoid keyboard flickering up and down when a country is selected
              keyExtractor={(item, index) => index.toString()}  // This is just to remove keys warning
            />
          }
        </View>

        {/* Guess input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Guess'
            value={guess}
            onChangeText={enterGuess}
          />
          <View style={styles.sendButtonContainer}>
            <Button
              title='Send'
              color={'#000000'}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>GEODLE</Text>
      </View>
      <GameContainer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    maxWidth: 500,
    alignSelf: 'center'
  },

  // Header
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameContainer: {
    flex: 9,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },

  // Flag
  flag: {
    flex: 9,
    alignSelf: 'center',
    borderWidth: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 512 / 341
  },

  // Guesses
  guessesContainer: {
    flex: 9,
    paddingTop: 50
  },

  // Autocomplete
  inputWithAutocompleteContainer: {
    flex: 3,
    padding: 10,
    paddingBottom: 20,
    minHeight: 50,
    width: '100%',
    justifyContent: 'flex-end'
  },
  autocompleteItem: {
    fontSize: 30
  },

  // Input
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 50,
    minHeight: 50
  },
  input: {
    flex: 8,
    borderWidth: 1,
    fontSize: 25,
  },

  //  Send
  sendButtonContainer: {
    flex: 1,
    minWidth: 10,
    alignSelf: 'center'
  }

});
