import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, KeyboardAvoidingView, FlatList } from 'react-native';

import flag from './img/512px-Flag_of_the_Netherlands.png'
import countriesList from './CountriesList';

function GameContainer() {
  const data = [
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
          data={data}
          renderItem={({ item }) => <Text style={styles.item}>{item.flag} {item.name}     {item.direction} {item.distance} km</Text>}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Guess'
        />
        <View style={styles.sendButtonContainer}>
          <Button
            title='Send'
            color={'#000000'}
          />
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
  },

  // Input
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 20,
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
    minWidth: 80,
  }

});
