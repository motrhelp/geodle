import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import Header from '../components/Header';
import Hearts from '../components/Hearts';
import leftArrow from '../img/left-arrow.png';

export default function GuessCapital({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />


      {/* Icon */}
      <Image
        style={styles.icon}
        resizeMode='center'
        source={require("../img/amsterdam.png")}
      />

      <Hearts hearts={5} />

      {/* The word */}
      <View style={styles.wordContainer}>
        <View style={[styles.wordCharacterContainer, styles.correct]}>
          <Text style={styles.wordCharacter}>A</Text>
        </View>
        <View style={styles.wordCharacterContainer}>
          <Text style={styles.wordCharacter}> </Text>
        </View>
        <View style={[styles.wordCharacterContainer, styles.correct]}>
          <Text style={styles.wordCharacter}>S</Text>
        </View>
        <View style={[styles.wordCharacterContainer, styles.correct]}>
          <Text style={styles.wordCharacter}>T</Text>
        </View>
        <View style={styles.wordCharacterContainer}>
          <Text style={styles.wordCharacter}></Text>
        </View>
        <View style={[styles.wordCharacterContainer, styles.correct]}>
          <Text style={styles.wordCharacter}>R</Text>
        </View>
        <View style={styles.wordCharacterContainer}>
          <Text style={styles.wordCharacter}> </Text>
        </View>
        <View style={[styles.wordCharacterContainer, styles.correct]}>
          <Text style={styles.wordCharacter}>A</Text>
        </View>
        <View style={styles.wordCharacterContainer}>
          <Text style={styles.wordCharacter}> </Text>
        </View>
      </View>

      {/* Keyboard */}
      <View style={styles.keyboardContainer}>
        <View style={styles.keyboardRowContainer}>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>Q</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>W</Text>
          </View>
          <View style={[styles.keyboardCharacterContainer, styles.almost]}>
            <Text style={styles.keyboardCharacter}>E</Text>
          </View>
          <View style={[styles.keyboardCharacterContainer, styles.correct]}>
            <Text style={styles.keyboardCharacter}>R</Text>
          </View>
          <View style={[styles.keyboardCharacterContainer, styles.correct]}>
            <Text style={styles.keyboardCharacter}>T</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>Y</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>U</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>I</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>O</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>P</Text>
          </View>
        </View>

        <View style={styles.keyboardRowContainer}>
          <View style={[styles.keyboardCharacterContainer, styles.correct]}>
            <Text style={styles.keyboardCharacter}>A</Text>
          </View>
          <View style={[styles.keyboardCharacterContainer, styles.correct]}>
            <Text style={styles.keyboardCharacter}>S</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>D</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>F</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>G</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>H</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>J</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>K</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>L</Text>
          </View>
        </View>

        <View style={styles.keyboardRowContainer}>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>Z</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>X</Text>
          </View>
          <View style={[styles.keyboardCharacterContainer, styles.wrong]}>
            <Text style={styles.keyboardCharacter}>C</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>V</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>B</Text>
          </View>
          <View style={styles.keyboardCharacterContainer}>
            <Text style={styles.keyboardCharacter}>N</Text>
          </View>
          <View style={[styles.keyboardCharacterContainer]}>
            <Text style={styles.keyboardCharacter}>M</Text>
          </View>
        </View>
      </View>

      <StatusBar style="auto" />

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center'
  },
  icon: {
    flex: 1
  },
  wordContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  wordCharacterContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderWidth: 2,
    width: 30,
    height: 30
  },
  wordCharacter: {
    fontSize: 20,
    alignSelf: 'center'
  },
  keyboardContainer: {
    flex: 2,
    alignSelf: 'center'
  },
  keyboardRowContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  keyboardCharacterContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderWidth: 2,
    width: 30,
    height: 40,
    justifyContent: 'center',
  },
  keyboardCharacter: {
    fontSize: 20,
    alignSelf: 'center'
  },
  correct: {
    backgroundColor: '#7fd672'
  },
  almost: {
    backgroundColor: '#dec83a'
  },
  wrong: {
    backgroundColor: '#aaa6ad'
  }
});
