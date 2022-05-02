
import { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import countryList from '../data/CountryList';
import { getBearingFromLatLon, getDistanceFromLatLonInKm } from '../util/DistanceCalculator';
import Flag from './Flag';
import { GameOverCountryName, GameOverLinks, GameOverMessage } from './GameOver';
import Guesses from './Guesses';
import Hearts from './Hearts';
import Autocomplete from './Autocomplete';
import { loadItem, storeItem } from '../util/DataStorage';
import { gameNumber } from '../util/GameNumber';

function countryToGuess() {
    const countriesWithFlags = countryList.filter(country => country.flag != null);
    return countriesWithFlags[gameNumber];
}

export default function GameContainer({ navigation }) {

    const [guess, setGuess] = useState("");
    const [autocompleteData, setAutocompleteData] = useState();
    const [country, setCountry] = useState(countryToGuess());
    const [guesses, setGuesses] = useState();
    const [hearts, setHearts] = useState();
    const [victory, setVictory] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        loadItem("guesses", [], setGuesses);
        loadItem("level1Victory", false, setVictory);
        loadItem("hearts", 5, setHearts);
    }

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
                        name: currentGuess.name,
                        direction: distance == 0 ? '✅' : bearing,
                        distance: distance + " km"
                    });

                // Register a try
                const newVictory = country.name == currentGuess.name;
                let newHearts = hearts;
                if (!newVictory) {
                    newHearts = hearts - 1;
                    setHearts(newHearts);
                }
                setVictory(newVictory);

                // Store the session data
                storeData(guesses, newHearts, newVictory);
            } else {
                alert(currentGuess.name + " does not have coordinates yet.")
            }
        }
        enterGuess("");
    }

    const onPressGEODLE = () => {
        AsyncStorage.clear();
        loadData();
        const countriesWithFlags = countryList.filter(country => country.flag != null);
        setCountry(countriesWithFlags[Math.floor(Math.random() * countriesWithFlags.length)]);
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
                    navigation={navigation}
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

    // Input
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
