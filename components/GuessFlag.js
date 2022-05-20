
import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View, Text } from 'react-native';

import { countriesWithFlags, countryList, searchCountry } from '../data/CountryList';

import { HeaderTitle, NextLevelArrow } from '../components/Header';
import Flag from './Flag';
import { GameOverCountryName, GlobeLink, ShareButton, GameOverMessage } from './GameOver';
import Guesses from './Guesses';
import Hearts from './Hearts';
import Autocomplete from './Autocomplete';
import { ExtraHearts, grantExtraHeart } from './ExtraHearts';

import { flushStorage, loadItem, storeItem } from '../util/DataStorage';
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
    const [extraHearts, setExtraHearts] = useState();
    const [victory, setVictory] = useState();
    const [level2Victory, setLevel2Victory] = useState();

    // Set up the level navigation header: title, next and previous level arrows
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "GEODLE",
            headerTitle: () => <HeaderTitle levelName={"Level 1"} />,
            headerRight: () => (
                <View style={styles.rowContainer}>
                    {victory ?
                        <NextLevelArrow
                            navigation={navigation}
                            navigateToNextLevel={navigateToLevel2}
                        />
                        :
                        <ExtraHearts
                            hearts={hearts}
                            setHearts={setHearts}
                            extraHearts={extraHearts}
                            setExtraHearts={setExtraHearts}
                        />
                    }
                </View>
            ),
            headerLeft: () =>
                hearts == 0 || level2Victory ?
                    <View style={styles.rowContainer}>
                        <GlobeLink country={country} />
                        <ShareButton />
                    </View>
                    : null
        }, [navigation]);
    })

    // Force app refresh every now and then to retire outdated code
    useEffect(() => {
        refreshVersion();
    })

    // Load guesses, hearts and such on startup and navigation
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });

        return unsubscribe;
    }, [navigation]);

    const loadData = async () => {
        loadItem("guesses", [], setGuesses);
        loadItem("level1Victory", false, setVictory);
        loadItem("level2Victory", false, setLevel2Victory);
        loadItem("hearts", 6, setHearts);
        loadItem("extraHearts", 3, setExtraHearts);
    }

    // Tester's "refresh" cheat
    const onPressGEODLE = () => {
        flushStorage();
        window.location.reload(false);
    }
    // Store guesses, hearts and such on device
    const storeData = async (guesses, hearts, victory, extraHearts) => {
        storeItem("guesses", guesses);
        storeItem("hearts", hearts);
        storeItem("extraHearts", extraHearts);
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
                let newExtraHearts = extraHearts;
                if (newVictory) {
                    setVictory(newVictory);
                    newExtraHearts = grantExtraHeart(extraHearts, setExtraHearts);

                    // Redirect to the next level
                    setTimeout(() => {
                        navigateToLevel2(navigation);
                    }, 1000)
                }

                // Store the session data
                storeData(guesses, newHearts, newVictory, newExtraHearts);
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
                <Flag
                    flag={country.flag}
                    flagAspectRatio={country.flagAspectRatio}
                />
                :
                null
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

        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
    },

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
        marginBottom: 20,
        maxWidth: 330
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
