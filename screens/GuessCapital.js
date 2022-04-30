import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';

import Hearts from '../components/Hearts';

import defaultIcon from '../img/government.png';

export default function GuessCapital({ navigation, route }) {

  const defaultCountry = {
    name: "Default Country",
    capital: {
      name: "Capital",
      icon: defaultIcon
    }
  }

  const [country, setCountry] = useState(route?.params?.country != null ? route.params.country : defaultCountry);
  const [hearts, setHearts] = useState(route?.params?.hearts != null ? route.params.hearts : 5)
  const [icon, setIcon] = useState(country.capital?.icon != null ? country.capital.icon : defaultCountry.capital.icon);
  const [correctCharacters, setCorrectCharacters] = useState([]);
  const [almostCharacters, setAlmostCharacters] = useState([]);
  const [wrongCharacters, setWrongCharacters] = useState([]);
  const [victory, setVictory] = useState(false)

  const [char1, setChar1] = useState('');
  const [char2, setChar2] = useState('');
  const [char3, setChar3] = useState('');
  const [char4, setChar4] = useState('');
  const [char5, setChar5] = useState('');
  const [char6, setChar6] = useState('');
  const [char7, setChar7] = useState('');
  const [char8, setChar8] = useState('');
  const [char9, setChar9] = useState('');
  const [char10, setChar10] = useState('');
  const [char1Guessed, setChar1Guessed] = useState(false);
  const [char2Guessed, setChar2Guessed] = useState(false);
  const [char3Guessed, setChar3Guessed] = useState(false);
  const [char4Guessed, setChar4Guessed] = useState(false);
  const [char5Guessed, setChar5Guessed] = useState(false);
  const [char6Guessed, setChar6Guessed] = useState(false);
  const [char7Guessed, setChar7Guessed] = useState(false);
  const [char8Guessed, setChar8Guessed] = useState(false);
  const [char9Guessed, setChar9Guessed] = useState(false);
  const [char10Guessed, setChar10Guessed] = useState(false);


  const capitalName = (country.capital?.name != null ? country.capital.name : defaultCountry.capital.name).toUpperCase();

  useEffect(() => {
  }, []);

  function isKeyEnabled(char) {
    if (wrongCharacters.includes(char)) {
      return false;
    } else if (correctCharacters.includes(char) && isCharacterGuessedInAllOccurrences(char)) {
      return false;
    }
    return true;
  }

  const onKeyboardPress = (char) => {
    if (isKeyEnabled(char)) {
      if (char1 == '' && capitalName.length > 0 && !char1Guessed) {
        setChar1(char)
      } else if (char2 == '' && capitalName.length > 1 && !char2Guessed) {
        setChar2(char)
      } else if (char3 == '' && capitalName.length > 2 && !char3Guessed) {
        setChar3(char)
      } else if (char4 == '' && capitalName.length > 3 && !char4Guessed) {
        setChar4(char)
      } else if (char5 == '' && capitalName.length > 4 && !char5Guessed) {
        setChar5(char)
      } else if (char6 == '' && capitalName.length > 5 && !char6Guessed) {
        setChar6(char)
      } else if (char7 == '' && capitalName.length > 6 && !char7Guessed) {
        setChar7(char)
      } else if (char8 == '' && capitalName.length > 7 && !char8Guessed) {
        setChar8(char)
      } else if (char9 == '' && capitalName.length > 8 && !char9Guessed) {
        setChar9(char)
      } else if (char10 == '' && capitalName.length > 9 && !char10Guessed) {
        setChar10(char)
      }
    }
  }

  const onKeyboardPressBack = () => {
    if (char10 != '' && capitalName.length > 9 && !char10Guessed) {
      setChar10('')
    } else if (char9 != '' && capitalName.length > 8 && !char9Guessed) {
      setChar9('')
    } else if (char8 != '' && capitalName.length > 7 && !char8Guessed) {
      setChar8('')
    } else if (char7 != '' && capitalName.length > 6 && !char7Guessed) {
      setChar7('')
    } else if (char6 != '' && capitalName.length > 5 && !char6Guessed) {
      setChar6('')
    } else if (char5 != '' && capitalName.length > 4 && !char5Guessed) {
      setChar5('')
    } else if (char4 != '' && capitalName.length > 3 && !char4Guessed) {
      setChar4('')
    } else if (char3 != '' && capitalName.length > 2 && !char3Guessed) {
      setChar3('')
    } else if (char2 != '' && capitalName.length > 1 && !char2Guessed) {
      setChar2('')
    } else if (char1 != '' && capitalName.length > 0 && !char1Guessed) {
      setChar1('')
    }
  }

  function processCharacterGuess(charIndex, char, charSetter, charGuessed, charGuessedSetter) {
    if (capitalName.length > charIndex && !charGuessed) {
      if (char == capitalName.charAt(charIndex)) {
        charGuessedSetter(true);
        correctCharacters.push(char);
      } else {
        if (capitalName.indexOf(char) > -1) {
          almostCharacters.push(char);
        } else {
          wrongCharacters.push(char);
        }
        charSetter('');
      }
    }
  }

  const onPressGuess = () => {
    processCharacterGuess(0, char1, setChar1, char1Guessed, setChar1Guessed);
    processCharacterGuess(1, char2, setChar2, char2Guessed, setChar2Guessed);
    processCharacterGuess(2, char3, setChar3, char3Guessed, setChar3Guessed);
    processCharacterGuess(3, char4, setChar4, char4Guessed, setChar4Guessed);
    processCharacterGuess(4, char5, setChar5, char5Guessed, setChar5Guessed);
    processCharacterGuess(5, char6, setChar6, char6Guessed, setChar6Guessed);
    processCharacterGuess(6, char7, setChar7, char7Guessed, setChar7Guessed);
    processCharacterGuess(7, char8, setChar8, char8Guessed, setChar8Guessed);
    processCharacterGuess(8, char9, setChar9, char9Guessed, setChar9Guessed);
    processCharacterGuess(9, char10, setChar10, char10Guessed, setChar10Guessed);
    console.log("Correct: " + correctCharacters);
  }

  function isCharacterGuessedInAllOccurrences(char) {
    return capitalName.split(char).length - 1 == correctCharacters.filter(correct => correct === char).length;
  }

  function getConditionalKeyboardStyles(char) {
    if (correctCharacters.includes(char)) {
      return isCharacterGuessedInAllOccurrences(char) ? styles.correct : styles.almost;
    } else if (almostCharacters.includes(char)) {
      return styles.almost;
    } else if (wrongCharacters.includes(char)) {
      return styles.wrong;
    }
  }

  return (
    <View style={styles.container}>

      {/* Icon */}
      {icon != null ?
        <Image
          style={styles.icon}
          resizeMode='center'
          source={icon}
        />
        :
        null
      }

      <Hearts hearts={hearts} />

      {/* The word */}
      {/* <View style={styles.wordContainer}>
        {word.map((prop, key) => {
          return (
            <View style={[styles.wordCharacterContainer]} key={key}>
              <Text style={styles.wordCharacter} key={key}>{prop}</Text>
            </View>
          );
        })}
      </View> */}

      {/* The word */}
      <View style={styles.wordContainer}>
        {capitalName.length > 0 ?
          <View style={[styles.wordCharacterContainer, char1Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char1}</Text>
          </View>
          : null}
        {capitalName.length > 1 ?
          <View style={[styles.wordCharacterContainer, char2Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char2}</Text>
          </View>
          : null}
        {capitalName.length > 2 ?
          <View style={[styles.wordCharacterContainer, char3Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char3}</Text>
          </View>
          : null}
        {capitalName.length > 3 ?
          <View style={[styles.wordCharacterContainer, char4Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char4}</Text>
          </View>
          : null}
        {capitalName.length > 4 ?
          <View style={[styles.wordCharacterContainer, char5Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char5}</Text>
          </View>
          : null}
        {capitalName.length > 5 ?
          <View style={[styles.wordCharacterContainer, char6Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char6}</Text>
          </View>
          : null}
        {capitalName.length > 6 ?
          <View style={[styles.wordCharacterContainer, char7Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char7}</Text>
          </View>
          : null}
        {capitalName.length > 7 ?
          <View style={[styles.wordCharacterContainer, char8Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char8}</Text>
          </View>
          : null}
        {capitalName.length > 8 ?
          <View style={[styles.wordCharacterContainer, char9Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char9}</Text>
          </View>
          : null}
        {capitalName.length > 9 ?
          <View style={[styles.wordCharacterContainer, char10Guessed ? styles.correct : styles.none]}>
            <Text style={styles.wordCharacter}>{char10}</Text>
          </View>
          : null}
      </View>

      {/* Keyboard */}
      <View style={styles.keyboardContainer}>
        <View style={styles.keyboardRowContainer}>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("Q")]}
            onPress={() => onKeyboardPress("Q")}>
            <Text style={styles.keyboardCharacter}>Q</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("W")]}
            onPress={() => onKeyboardPress("W")}>
            <Text style={styles.keyboardCharacter}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("E")]}
            onPress={() => onKeyboardPress("E")}>
            <Text style={styles.keyboardCharacter}>E</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("R")]}
            onPress={() => onKeyboardPress("R")}>
            <Text style={styles.keyboardCharacter}>R</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("T")]}
            onPress={() => onKeyboardPress("T")}>
            <Text style={styles.keyboardCharacter}>T</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("Y")]}
            onPress={() => onKeyboardPress("Y")}>
            <Text style={styles.keyboardCharacter}>Y</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("U")]}
            onPress={() => onKeyboardPress("U")}>
            <Text style={styles.keyboardCharacter}>U</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("I")]}
            onPress={() => onKeyboardPress("I")}>
            <Text style={styles.keyboardCharacter}>I</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("O")]}
            onPress={() => onKeyboardPress("O")}>
            <Text style={styles.keyboardCharacter}>O</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("P")]}
            onPress={() => onKeyboardPress("P")}>
            <Text style={styles.keyboardCharacter}>P</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardRowContainer}>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("A")]}
            onPress={() => onKeyboardPress("A")}>
            <Text style={styles.keyboardCharacter}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("S")]}
            onPress={() => onKeyboardPress("S")}>
            <Text style={styles.keyboardCharacter}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("D")]}
            onPress={() => onKeyboardPress("D")}>
            <Text style={styles.keyboardCharacter}>D</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("F")]}
            onPress={() => onKeyboardPress("F")}>
            <Text style={styles.keyboardCharacter}>F</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("G")]}
            onPress={() => onKeyboardPress("G")}>
            <Text style={styles.keyboardCharacter}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("H")]}
            onPress={() => onKeyboardPress("H")}>
            <Text style={styles.keyboardCharacter}>H</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("J")]}
            onPress={() => onKeyboardPress("J")}>
            <Text style={styles.keyboardCharacter}>J</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("K")]}
            onPress={() => onKeyboardPress("K")}>
            <Text style={styles.keyboardCharacter}>K</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("L")]}
            onPress={() => onKeyboardPress("L")}>
            <Text style={styles.keyboardCharacter}>L</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardRowContainer}>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("Z")]}
            onPress={() => onKeyboardPress("Z")}>
            <Text style={styles.keyboardCharacter}>Z</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("X")]}
            onPress={() => onKeyboardPress("X")}>
            <Text style={styles.keyboardCharacter}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("C")]}
            onPress={() => onKeyboardPress("C")}>
            <Text style={styles.keyboardCharacter}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("V")]}
            onPress={() => onKeyboardPress("V")}>
            <Text style={styles.keyboardCharacter}>V</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("B")]}
            onPress={() => onKeyboardPress("B")}>
            <Text style={styles.keyboardCharacter}>B</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("N")]}
            onPress={() => onKeyboardPress("N")}>
            <Text style={styles.keyboardCharacter}>N</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, getConditionalKeyboardStyles("M")]}
            onPress={() => onKeyboardPress("M")}>
            <Text style={styles.keyboardCharacter}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.keyboardCharacterContainer, styles.wideCharacter]}
            onPress={() => onKeyboardPressBack()}>
            <Text style={styles.keyboardCharacter}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardRowContainer}>
          <TouchableOpacity style={styles.guessButtonContainer}
            onPress={() => onPressGuess()}>
            <Text style={styles.guessButton}>GUESS</Text>
          </TouchableOpacity>
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
    flex: 1,
    marginTop: 20,
  },
  wordContainer: {
    flex: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    maxHeight: 40,
  },
  wordCharacterContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderWidth: 2,
    width: 30,
    maxWidth: 30,
    height: 30
  },
  wordCharacter: {
    fontSize: 20,
    alignSelf: 'center'
  },
  keyboardContainer: {
    flex: 2,
    alignSelf: 'center',
    maxHeight: 225,
    paddingBottom: 10,
    marginTop: 50,
  },
  keyboardRowContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  keyboardCharacterContainer: {
    flex: 1,
    marginHorizontal: 3,
    borderWidth: 2,
    maxWidth: 30,
    minWidth: 30,
    height: 40,
    justifyContent: 'center',
  },
  keyboardSpaceContainer: {
    flex: 1,
    marginHorizontal: 3,
    width: 60,
    height: 40,
    justifyContent: 'center',
  },
  keyboardCharacter: {
    fontSize: 20,
    alignSelf: 'center'
  },
  wideCharacter: {
    minWidth: 60
  },
  correct: {
    backgroundColor: '#7fd672'
  },
  almost: {
    backgroundColor: '#dec83a'
  },
  wrong: {
    backgroundColor: '#aaa6ad'
  },
  guessButtonContainer: {
    alignSelf: 'center',
    minWidth: 275,
    minHeight: 40,
    maxHeight: 40,
    borderWidth: 2,
    justifyContent: 'center'
  },
  guessButton: {
    fontSize: 20,
    alignSelf: 'center'
  },
});
