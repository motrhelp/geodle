
import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import countriesWithFlags, { countryList, searchCountry } from '../data/CountryList';

import { HeaderTitle, NextLevelArrow } from '../components/Header';
import Flag from './Flag';
import { GameOverCountryName, GameOverLinks, GameOverMessage } from './GameOver';
import Guesses from './Guesses';
import Hearts from './Hearts';
import Autocomplete from './Autocomplete';

import { loadItem, storeItem } from '../util/DataStorage';
import { gameNumber } from '../util/GameNumber';
import refreshVersion from '../util/AppVersion';
import { navigateToLevel2 } from '../util/Navigation';
import { getBearingFromLatLon, getDistanceFromLatLonInKm } from '../util/DistanceCalculator';

export default function GuessFlag({ navigation }) {

    const [guess, setGuess] = useState("");
    const [autocompleteData, setAutocompleteData] = useState();
    const [country, setCountry] = useState(countriesWithFlags[gameNumber]);
    const [guesses, setGuesses] = useState();
    const [hearts, setHearts] = useState();
    const [victory, setVictory] = useState();

    // Set up the level navigation header: title, next and previous level arrows
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle levelName={"Level 1"} />,
            headerRight: () => (
                victory && hearts > 0 ?
                    <NextLevelArrow
                        navigation={navigation}
                        navigateToNextLevel={navigateToLevel2}
                    />
                    : null
            ),
            headerLeft: null
        }, [navigation]);
    })

    // Force app refresh every now and then to retire outdated code
    useEffect(() => {
        refreshVersion();
    })

    // Load guesses, hearts and such from device storage
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        loadItem("guesses", [], setGuesses);
        loadItem("level1Victory", false, setVictory);
        loadItem("hearts", 6, setHearts);
    }

    // Tester's "refresh" cheat
    const onPressGEODLE = () => {
        AsyncStorage.clear();
        loadData();
        const countriesWithFlags = countryList.filter(country => country.flag != null);
        setCountry(countriesWithFlags[Math.floor(Math.random() * countriesWithFlags.length)]);
    }

    // Store guesses, hearts and such on device
    const storeData = async (guesses, hearts, victory) => {
        storeItem("guesses", guesses);
        storeItem("hearts", hearts);
        storeItem("level1Victory", victory);
    }

    // Put a character or country name in the guess container, updating both guess and autocompleteData variables.
    const enterGuess = (text) => {
        setGuess(text);
        if (text == "") {
            setAutocompleteData();
        } else {
            setAutocompleteData(searchCountry(text));
        }
    }

    // Process "Guess" button press
    const onPressGuess = () => {
        if (guess) {
            // Calculate distance and direction to the sought country
            const currentGuess = countryList.filter(country => country.name == guess)[0];
            if (currentGuess.lat) {
                const distance = Math.floor(getDistanceFromLatLonInKm(currentGuess.lat, currentGuess.lon, country.lat, country.lon));
                const bearing = getBearingFromLatLon(currentGuess.lat, currentGuess.lon, country.lat, country.lon);
                guesses.push(
                    {
                        name: currentGuess.name,
                        direction: distance == 0 ? '✓' : bearing,
                        distance: distance + " km"
                    });

                // Register a try
                const newVictory = country.name == currentGuess.name;
                let newHearts = hearts;
                if (!newVictory) {
                    newHearts = hearts - 1;
                    setHearts(newHearts);
                }

                // Process victory
                if (newVictory) {
                    setVictory(newVictory);

                    // Redirect to the next level
                    setTimeout(() => {
                        navigateToLevel2(navigation);
                    }, 2000)
                }

                // Store the session data
                storeData(guesses, newHearts, newVictory);
            } else {
                alert(currentGuess.name + " does not have coordinates yet.")
            }
        }

        // Clear Guess field after the attempt
        enterGuess("");
    }

    return (
        <KeyboardAvoidingView
            style={styles.gameContainer}
            behavior='padding'
        >

            {/* Flag */}
            {country.flag ?
                <Flag flag={country.flag} /> : null
            }

            {/* Hearts */}
            <Hearts hearts={hearts} onPressHearts={onPressGEODLE} />
            {hearts == 0 ?
                <GameOverCountryName countryName={country.name} />
                :
                null
            }

            {/* Hint */}
            {guesses == null || guesses.length == 0 ?
                <View style={styles.hintContainer}>
                    <Text style={styles.hintText}>Can you guess the country by its flag?</Text>
                </View>
                :
                null
            }

            {/* Guesses */}
            {guesses != null && guesses.length != 0 ?
                <Guesses guesses={guesses} />
                :
                null
            }

            {/* Autocomplete */}
            <Autocomplete autocompleteData={autocompleteData} enterGuess={enterGuess} />

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
                :
                <GameOverMessage victory={victory} />
            }

            {/* End game links */}
            {hearts == 0 || victory ?
                <GameOverLinks
                    guesses={guesses}
                    hearts={hearts}
                    country={country}
                />
                :
                null
            }

        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    gameContainer: {
        flex: 9,
        alignItems: 'center',
    },

    // "Guess" input
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50,
        minHeight: 40,
        justifyContent: 'center',
        marginBottom: 20
    },
    input: {
        flex: 8,
        borderWidth: 1,
        fontSize: 25,
        maxWidth: '90%',
    },

    // Hint
    hintContainer: {
        flex: 9,
        alignItems: 'center',
    },
    hintText: {
        fontSize: 18
    },

    //  Send
    sendButtonContainer: {
        flex: 2,
        minWidth: 60,
        alignSelf: 'center',
        paddingLeft: 5
    },
});
