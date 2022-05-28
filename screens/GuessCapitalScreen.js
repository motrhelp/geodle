import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState, useLayoutEffect } from 'react';

import Hearts from '../components/Hearts';

import defaultIcon from '../img/government.png';
import { GameOverMessage, GlobeLink, ShareButton } from '../components/GameOver';
import { loadGlobalItem, loadItem, storeGlobalItem, storeItem } from '../util/DataStorage';
import refreshVersion from '../util/AppVersion';
import { countryList } from '../data/CountryList';
import { gameNumber } from '../util/GameNumber';
import leftArrow from '../img/left-arrow.png'
import { navigateToLevel1, navigateToLevel3 } from '../util/Navigation';
import { HeaderLeft, NextLevelArrow } from '../components/Header';
import { ExtraHearts, grantExtraHeart } from '../components/ExtraHearts';

export default function GuessCapitalScreen({ navigation }) {

  const defaultCountry = {
    name: "Default Country",
    capital: {
      name: "Capital",
      icon: defaultIcon
    }
  }

  const [country, setCountry] = useState(countryList.filter(country => country.flag != null)[gameNumber]);
  const [hearts, setHearts] = useState();
  const [extraHearts, setExtraHearts] = useState();
  const [icon, setIcon] = useState(defaultIcon);
  const [correctCharacters, setCorrectCharacters] = useState([]);
  const [almostCharacters, setAlmostCharacters] = useState([]);
  const [wrongCharacters, setWrongCharacters] = useState([]);
  const [victory, setVictory] = useState(false);
  const [level2Guesses, setLevel2Guesses] = useState([]);

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
  const [char11, setChar11] = useState('');
  const [char12, setChar12] = useState('');
  const [char13, setChar13] = useState('');
  const [char14, setChar14] = useState('');
  const [char15, setChar15] = useState('');
  const [char16, setChar16] = useState('');
  const [char17, setChar17] = useState('');
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
  const [char11Guessed, setChar11Guessed] = useState(false);
  const [char12Guessed, setChar12Guessed] = useState(false);
  const [char13Guessed, setChar13Guessed] = useState(false);
  const [char14Guessed, setChar14Guessed] = useState(false);
  const [char15Guessed, setChar15Guessed] = useState(false);
  const [char16Guessed, setChar16Guessed] = useState(false);
  const [char17Guessed, setChar17Guessed] = useState(false);

  const charArray = [
    { char: char1, setChar: setChar1, charGuessed: char1Guessed, setCharGuessed: setChar1Guessed },
    { char: char2, setChar: setChar2, charGuessed: char2Guessed, setCharGuessed: setChar2Guessed },
    { char: char3, setChar: setChar3, charGuessed: char3Guessed, setCharGuessed: setChar3Guessed },
    { char: char4, setChar: setChar4, charGuessed: char4Guessed, setCharGuessed: setChar4Guessed },
    { char: char5, setChar: setChar5, charGuessed: char5Guessed, setCharGuessed: setChar5Guessed },
    { char: char6, setChar: setChar6, charGuessed: char6Guessed, setCharGuessed: setChar6Guessed },
    { char: char7, setChar: setChar7, charGuessed: char7Guessed, setCharGuessed: setChar7Guessed },
    { char: char8, setChar: setChar8, charGuessed: char8Guessed, setCharGuessed: setChar8Guessed },
    { char: char9, setChar: setChar9, charGuessed: char9Guessed, setCharGuessed: setChar9Guessed },
    { char: char10, setChar: setChar10, charGuessed: char10Guessed, setCharGuessed: setChar10Guessed },
    { char: char11, setChar: setChar11, charGuessed: char11Guessed, setCharGuessed: setChar11Guessed },
    { char: char12, setChar: setChar12, charGuessed: char12Guessed, setCharGuessed: setChar12Guessed },
    { char: char13, setChar: setChar13, charGuessed: char13Guessed, setCharGuessed: setChar13Guessed },
    { char: char14, setChar: setChar14, charGuessed: char14Guessed, setCharGuessed: setChar14Guessed },
    { char: char15, setChar: setChar15, charGuessed: char15Guessed, setCharGuessed: setChar15Guessed },
    { char: char16, setChar: setChar16, charGuessed: char16Guessed, setCharGuessed: setChar16Guessed },
    { char: char17, setChar: setChar17, charGuessed: char17Guessed, setCharGuessed: setChar17Guessed },
  ]

  function setCharArray(newCharArray) {
    for (let i = 0; i < charArray.length; i++) {
      if (capitalName.charAt(i) == " ") {
        charArray[i].setChar(" ");
        charArray[i].setCharGuessed(true);
      } else if (capitalName.charAt(i) == "'") {
        charArray[i].setChar("'");
        charArray[i].setCharGuessed(true);
      } else {
        charArray[i].setChar(newCharArray[i].char);
        charArray[i].setCharGuessed(newCharArray[i].charGuessed);
      }
    }
  }

  const capitalName = (country.capital?.name != null ? country.capital.name : defaultCountry.capital.name).toUpperCase();

  function Header() {
    return (
      <Text style={styles.headerTitle}>GEODLE{'\n'} Level 2</Text>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'GEODLE\n Level 2',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackButtonMenuEnabled: false,
      headerTitle: () => <Header />,
      headerRight: () => (
        victory && country.shape != null ?
          <View style={styles.rowContainer}>
            <NextLevelArrow navigation={navigation}
              navigateToNextLevel={navigateToLevel3} />
          </View>
          :
          <ExtraHearts
            hearts={hearts}
            setHearts={setHearts}
            extraHearts={extraHearts}
            setExtraHearts={setExtraHearts}
            victory={victory}
          />
      ),
      headerLeft: () =>
        <HeaderLeft
          country={country}
          showGlobe={victory}
          navigation={navigation}
          navigateBack={navigateToLevel1}
        />
    }, [navigation]);
  })

  // Force app refresh every now and then to retire outdated code
  useEffect(() => {
    refreshVersion();
  })

  useEffect(() => {
    loadGlobalItem("extraHearts", 0, setExtraHearts);
    loadItem("charArray", charArray, setCharArray);
    loadItem("correctCharacters", [], setCorrectCharacters);
    loadItem("almostCharacters", [], setAlmostCharacters);
    loadItem("wrongCharacters", [], setWrongCharacters);
    loadItem("level2Guesses", [], setLevel2Guesses);
    loadItem("hearts", 6, setHearts);
    loadItem("level2Victory", false, setVictory);
  }, []);

  useEffect(() => {
    storeItem("charArray", charArray);
    storeItem("correctCharacters", correctCharacters);
    storeItem("almostCharacters", almostCharacters);
    storeItem("wrongCharacters", wrongCharacters);
    storeGlobalItem("extraHearts", extraHearts);
    storeItem("hearts", hearts);
    storeItem("level2Victory", victory);
    storeItem("level2Guesses", level2Guesses);
  }, [victory, hearts]);

  // Verify if the corresponding character keyboard key is not already guessed
  function isKeyEnabled(char) {
    if (victory || hearts == 0 || wrongCharacters.includes(char)) {
      return false;
    } else if (correctCharacters.includes(char) && isCharacterGuessedInAllOccurrences(char)) {
      return false;
    }
    return true;
  }

  // Keyboard press
  const onKeyboardPress = (char) => {
    if (isKeyEnabled(char)) {
      for (let i = 0; i < capitalName.length; i++) {
        if (charArray[i].char == '' && capitalName.length > i && !charArray[i].charGuessed) {
          charArray[i].setChar(char);
          break;
        }
      }
    }
  }

  // Keyboard "<-" back button
  const onKeyboardPressBack = () => {
    for (let i = charArray.length - 1; i >= 0; i--) {
      if (charArray[i].char != '' && capitalName.length > i - 1 && !charArray[i].charGuessed) {
        charArray[i].setChar('');
        break;
      }
    }
  }

  function areAllCharactersGuessed() {
    return correctCharacters.length == capitalName.replaceAll(" ", "").replaceAll("'", "").length
  }

  function processCharacterGuess(charIndex, char, charSetter, charGuessed, charGuessedSetter) {
    if (capitalName.length > charIndex && !charGuessed) {
      if (char == capitalName.charAt(charIndex)) {
        charGuessedSetter(true);
        correctCharacters.push(char);
      } else if (char != "") {
        if (capitalName.indexOf(char) > -1) {
          almostCharacters.push(char);
        } else {
          wrongCharacters.push(char);
        }
        charSetter('');
      }
    }
    if (areAllCharactersGuessed()) {
      setVictory(true);
      grantExtraHeart(extraHearts, setExtraHearts);

      // Redirect to the next level
      if (country.shape != null) {
        setTimeout(() => {
          navigateToLevel3(navigation);
        }, 1000)
      }
    }
  }

  function charactersEntered() {
    return charArray.filter((character) => { return character.char != '' }).length;
  }


  function onPressGuess() {
    if (charactersEntered() >= capitalName.length) {  // ignore Guess button until every character is filled in
      const oldCorrect = [...correctCharacters];
      const oldAlmost = [...almostCharacters];

      for (let i = 0; i < capitalName.length; i++) {
        processCharacterGuess(i, charArray[i].char, charArray[i].setChar, charArray[i].charGuessed, charArray[i].setCharGuessed);
      }
      if (!areAllCharactersGuessed()) {
        setHearts(hearts - 1);
      }

      if (areAllCharactersGuessed()) {
        level2Guesses.push("✅");
      } else if (correctCharacters.length > oldCorrect.length) {
        level2Guesses.push("🟩");
      } else if (almostCharacters.length > oldAlmost.length) {
        level2Guesses.push("🟧");
      } else {
        level2Guesses.push("⬜️");
      }
    }
  }

  // Remove the character pressed in the word
  function onPressWordChar(index) {
    if (!charArray[index].charGuessed) {
      charArray[index].setChar('');
    }
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

  function getConditionalWordStyles(index) {
    var conditionalWordStyles = [];
    if (capitalName.charAt(index) == " " || capitalName.charAt(index) == "'") {
      conditionalWordStyles.push(styles.wordCharacterSpace);
    } else {
      conditionalWordStyles.push(styles.wordCharacterContainer);
      if (charArray[index].charGuessed) {
        conditionalWordStyles.push(styles.correct);
      }
    }
    return conditionalWordStyles;
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

      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>Can you guess the capital of {country.name}?</Text>
      </View>

      {/* The word */}
      <View style={styles.wordContainer}>
        {capitalName.length > 0 ?
          <TouchableOpacity style={getConditionalWordStyles(0)}
            onPress={() => onPressWordChar(0)}>
            <Text style={styles.wordCharacter}>{char1}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 1 ?
          <TouchableOpacity style={getConditionalWordStyles(1)}
            onPress={() => onPressWordChar(1)}>
            <Text style={styles.wordCharacter}>{char2}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 2 ?
          <TouchableOpacity style={getConditionalWordStyles(2)}
            onPress={() => onPressWordChar(2)}>
            <Text style={styles.wordCharacter}>{char3}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 3 ?
          <TouchableOpacity style={getConditionalWordStyles(3)}
            onPress={() => onPressWordChar(3)}>
            <Text style={styles.wordCharacter}>{char4}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 4 ?
          <TouchableOpacity style={getConditionalWordStyles(4)}
            onPress={() => onPressWordChar(4)}>
            <Text style={styles.wordCharacter}>{char5}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 5 ?
          <TouchableOpacity style={getConditionalWordStyles(5)}
            onPress={() => onPressWordChar(5)}>
            <Text style={styles.wordCharacter}>{char6}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 6 ?
          <TouchableOpacity style={getConditionalWordStyles(6)}
            onPress={() => onPressWordChar(6)}>
            <Text style={styles.wordCharacter}>{char7}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 7 ?
          <TouchableOpacity style={getConditionalWordStyles(7)}
            onPress={() => onPressWordChar(7)}>
            <Text style={styles.wordCharacter}>{char8}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 8 ?
          <TouchableOpacity style={getConditionalWordStyles(8)}
            onPress={() => onPressWordChar(8)}>
            <Text style={styles.wordCharacter}>{char9}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 9 ?
          <TouchableOpacity style={getConditionalWordStyles(9)}
            onPress={() => onPressWordChar(9)}>
            <Text style={styles.wordCharacter}>{char10}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 10 ?
          <TouchableOpacity style={getConditionalWordStyles(10)}
            onPress={() => onPressWordChar(10)}>
            <Text style={styles.wordCharacter}>{char11}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 11 ?
          <TouchableOpacity style={getConditionalWordStyles(11)}
            onPress={() => onPressWordChar(11)}>
            <Text style={styles.wordCharacter}>{char12}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 12 ?
          <TouchableOpacity style={getConditionalWordStyles(12)}
            onPress={() => onPressWordChar(12)}>
            <Text style={styles.wordCharacter}>{char13}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 13 ?
          <TouchableOpacity style={getConditionalWordStyles(13)}
            onPress={() => onPressWordChar(13)}>
            <Text style={styles.wordCharacter}>{char14}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 14 ?
          <TouchableOpacity style={getConditionalWordStyles(14)}
            onPress={() => onPressWordChar(14)}>
            <Text style={styles.wordCharacter}>{char15}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 15 ?
          <TouchableOpacity style={getConditionalWordStyles(15)}
            onPress={() => onPressWordChar(15)}>
            <Text style={styles.wordCharacter}>{char16}</Text>
          </TouchableOpacity>
          : null}
        {capitalName.length > 16 ?
          <TouchableOpacity style={getConditionalWordStyles(16)}
            onPress={() => onPressWordChar(16)}>
            <Text style={styles.wordCharacter}>{char17}</Text>
          </TouchableOpacity>
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

        {/* Guess button, Victory or Game Over Message  */}
        <View style={styles.keyboardRowContainer}>
          {victory || hearts == 0 ?
            <GameOverMessage victory={victory} />
            :
            <TouchableOpacity style={styles.guessButtonContainer}
              onPress={() => onPressGuess()}>
              <Text style={styles.guessButton}>GUESS</Text>
            </TouchableOpacity>
          }
        </View>

      </View>

      <StatusBar style="auto" />

    </View >
  );
}

const styles = StyleSheet.create({
  // Navigation header
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  nextLevelArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nextLevelText: {
    fontWeight: 'bold'
  },
  nextLevelArrow: {
    flex: 1,
    minHeight: 25,
    aspectRatio: 512 / 512,
    marginRight: 20,
  },
  previousLevelArrow: {
    flex: 1,
    minHeight: 25,
    aspectRatio: 512 / 512,
    marginLeft: 20,
  },
  rowContainer: {
    flexDirection: 'row'
  },

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

  hintContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 30,
    marginBottom: 10,
  },
  hintText: {
    fontSize: 20
  },

  wordContainer: {
    flex: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    maxHeight: 40,
    flexWrap: 'wrap'
  },
  wordCharacterSpace: {
    flex: 1,
    margin: 5,
    width: 30,
    maxWidth: 30,
    height: 30
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
    minHeight: 225,
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
  gameOverContainer: {
    flex: 2,
    alignSelf: 'center',
  },
});
