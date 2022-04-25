import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import countryList from './CountryList';
import { getDistanceFromLatLonInKm, getBearingFromLatLon } from './DistanceCalculator';
import ramdomEmoji from './RandomEmoji';

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
  const [victory, setVictory] = useState();

  // Put a character or country name in the guess container, updating both guess and autocompleteData variables.
  const enterGuess = (text) => {
    setGuess(text);
    if (text == "") {
      setAutocompleteData();
    } else {
      console.log(autocompleteData);
      setAutocompleteData(countryList.filter((country) => country.name.toLowerCase().startsWith(text.toLowerCase())));
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
            emoji: currentGuess.emoji ? currentGuess.emoji : ramdomEmoji(),
            name: currentGuess.name,
            direction: distance == 0 ? '✅' : bearing,
            distance: distance + " km"
          });

        // Register a try
        if (country.name == currentGuess.name) {
          setVictory(true);
        } else {
          setHearts(hearts - 1);
        }
      } else {
        alert(currentGuess.name + " does not have coordinates yet.")
      }
    }
    enterGuess("");
  }

  const onPressShare = () => {
    let shareString = "";
    for (let i = 0; i < 5; i++) {
      if (i < hearts) {
        shareString += "♥ ";
      } else {
        shareString += "♡ ";
      }
    }
    for (const guess of guesses) {
      shareString += "\n" + guess.direction + " " + guess.distance;
    }
    shareString += "\n" + "http://motrhelp.github.io/geodle"
    Clipboard.setString(shareString);
    alert("Results copied to clipboard, share on!")
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
      {hearts > 0 ?
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
        :
        <Text style={styles.gameOver}>{country.name.toUpperCase()}</Text>
      }

      {/* Guesses */}
      <View style={styles.guessesContainer}>
        <FlatList
          data={guesses}
          renderItem={({ item }) =>
            <View style={styles.guessContainer}>
              <Text style={styles.guessFlag}>{item.emoji}</Text>
              <Text style={styles.guessName}>{item.name}</Text>
              <Text style={styles.guessDirection}>{item.direction}</Text>
              <Text style={styles.guessDistance}>{item.distance}</Text>
            </View>
          }
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

        {hearts > 0 && !victory ?
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
                color={'black'}
                onPress={onPressGuess}
              />
            </View>
          </View>
          : victory ?
            <View>
              <TouchableOpacity
                onPress={() => onPressShare()}
              >
                <Text style={styles.gameOver}>VICTORY</Text>
                <Text style={styles.clickToShare}>(click to share)</Text>
              </TouchableOpacity>
            </View>
            :
            <View>
              <Text style={styles.gameOver}>GAME OVER</Text>
            </View>
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
    width: '100%',
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
    aspectRatio: 512 / 341
  },

  // Guesses
  guessesContainer: {
    flex: 9,
    paddingTop: 30,
    minWidth: '80%'
  },
  guessContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  guessFlag: {
    flex: 1,
    fontSize: 15,
  },
  guessName: {
    flex: 5,
    fontSize: 15,
  },
  guessDirection: {
    flex: 1,
    fontSize: 15,
  },
  guessDistance: {
    flex: 3,
    fontSize: 15,
  },

  // Autocomplete
  inputWithAutocompleteContainer: {
    flex: 4,
    padding: 10,
    paddingBottom: 20,
    minHeight: 50,
    width: '100%',
    justifyContent: 'flex-end',
    maxHeight: 50
  },
  autocompleteContainer: {
    maxHeight: 160
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
    minHeight: 40,
    justifyContent: 'center'
  },
  input: {
    flex: 8,
    borderWidth: 1,
    fontSize: 25,
    maxWidth: '90%',
  },

  //  Send
  sendButtonContainer: {
    flex: 2,
    minWidth: "60px",
    alignSelf: 'center',
    paddingLeft: 5
  },

  // Game over
  gameOver: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: "bold",
  },
  clickToShare: {
    alignSelf: 'center'
  },

});
