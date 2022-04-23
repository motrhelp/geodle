import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';

import countryList from './CountryList';
import { getDistanceFromLatLonInKm, getBearingFromLatLon } from './DistanceCalculator';

function countryToGuess() {
  const countriesWithFlags = countryList.filter(country => country.flag != null);
  var randomCountry = countriesWithFlags[Math.floor(Math.random() * countriesWithFlags.length)];
  return randomCountry;
}

function GameContainer() {

  const [guess, setGuess] = useState("");
  const [autocompleteData, setAutocompleteData] = useState();
  const [country, setCountry] = useState(countryToGuess());
  const [guesses, setGuesses] = useState([]);
  const [hearts, setHearts] = useState(5);

  // Put a character or country name in the guess container, updating both guess and autocompleteData variables.
  const enterGuess = (text) => {
    setGuess(text);
    if (text == "") {
      setAutocompleteData();
    } else {
      setAutocompleteData(countryList.filter((country) => country.name.startsWith(text)))
    }
  }

  const onPressGuess = () => {
    if (guess) {
      const currentGuess = countryList.filter(country => country.name == guess)[0];
      if (currentGuess.lat) {
        const distance = Math.floor(getDistanceFromLatLonInKm(currentGuess.lat, currentGuess.lon, country.lat, country.lon));
        const bearing = getBearingFromLatLon(currentGuess.lat, currentGuess.lon, country.lat, country.lon);
        guesses.push(
          {
            flag: currentGuess.emoji,
            name: currentGuess.name,
            direction: distance == 0 ? '✅' : bearing,
            distance: distance
          });

        // Register a try
        setHearts(hearts - 1);
      } else {
        alert(currentGuess.name + " does not have coordinates yet.")
      }
    }
    enterGuess("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.gameContainer}
      behavior='padding'
    >

      {/* Flag */}
      {country.flag ?
        <Image
          style={styles.flag}
          resizeMode='stretch'
          source={country.flag}
        />
        : null
      }

      {/* Hearts */}
      <View style={styles.heartsContainer}>
        {hearts > 0 ?
          <Text style={styles.heart}>♥</Text>
          :
          <Text style={styles.heart}>♡</Text>
        }
        {hearts > 1 ?
          <Text style={styles.heart}>♥</Text>
          :
          <Text style={styles.heart}>♡</Text>
        }
        {hearts > 2 ?
          <Text style={styles.heart}>♥</Text>
          :
          <Text style={styles.heart}>♡</Text>
        }
        {hearts > 3 ?
          <Text style={styles.heart}>♥</Text>
          :
          <Text style={styles.heart}>♡</Text>
        }
        {hearts > 4 ?
          <Text style={styles.heart}>♥</Text>
          :
          <Text style={styles.heart}>♡</Text>
        }
      </View>

      {/* Guesses */}
      <View style={styles.guessesContainer}>
        <FlatList
          data={guesses}
          renderItem={({ item }) => <Text style={styles.guessText}>{item.flag} {item.name}     {item.direction} {item.distance} km</Text>}
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

        {hearts > 0 ?
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Guess'
              value={guess}
              onChangeText={enterGuess}
            />
            {guess == "" ?
              null :
              <View style={styles.sendButtonContainer}>
                <Button
                  title='Send'
                  color={'#000000'}
                  onPress={onPressGuess}
                />
              </View>
            }
          </View>
          :
          <Text style={styles.gameOver}>GAME OVER</Text>
        }


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
    paddingTop: 15
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
    paddingTop: 50,
  },
  guessText: {
    fontSize: 20,
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

  // Hearts
  heartsContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
    minWidth: 250
  },
  heart: {
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
    flex: 2,
    minWidth: 10,
    alignSelf: 'center'
  },

  // Game over
  gameOver: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: "bold",
  },

});
