
import { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import countryList from '../data/CountryList';
import { getBearingFromLatLon, getDistanceFromLatLonInKm } from '../util/DistanceCalculator';
import ramdomEmoji from '../util/RandomEmoji';
import Flag from './Flag';
import { GameOverCountryName, GameOverLinks, GameOverMessage } from './GameOver';
import Guesses from './Guesses';
import Hearts from './Hearts';
import Autocomplete from './Autocomplete';

function countryToGuess() {
    const countriesWithFlags = countryList.filter(country => country.flag != null);
    const today = new Date();
    const todayCountryIndex = (today.getDate() + today.getMonth() * 13) % countriesWithFlags.length;
    return countriesWithFlags[todayCountryIndex];
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
        try {
            const today = new Date();
            const datePrefix = today.getDate() + "" + today.getMonth();
            loadItem(datePrefix, "guesses", setGuesses, []);
            loadItem(datePrefix, "victory", setVictory, false);
            loadItem(datePrefix, "hearts", setHearts, 5);
        } catch (e) {
            console.log(e);
        }
    }

    const loadItem = async (datePrefix, item, setterToCall, alternative) => {
        const itemFromStorage = await AsyncStorage.getItem('@' + datePrefix + item);
        if (itemFromStorage != null) {
            setterToCall(JSON.parse(itemFromStorage));
        } else {
            setterToCall(alternative);
        }
    }

    const storeData = async (guesses, hearts, victory) => {
        try {
            const today = new Date();
            const datePrefix = today.getDate() + "" + today.getMonth();
            await AsyncStorage.setItem('@' + datePrefix + "guesses", JSON.stringify(guesses));
            await AsyncStorage.setItem('@' + datePrefix + "hearts", JSON.stringify(hearts));
            await AsyncStorage.setItem('@' + datePrefix + "victory", JSON.stringify(victory));
        } catch (e) {
            console.log(e);
        }
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
                        emoji: currentGuess.emoji ? currentGuess.emoji : ramdomEmoji(),
                        name: currentGuess.name,
                        direction: distance == 0 ? '✅' : bearing,
                        distance: distance + " km"
                    });

                // Register a try
                const newHearts = hearts - 1;
                const newVictory = country.name == currentGuess.name;
                setVictory(newVictory);
                setHearts(newHearts);

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
            {hearts > 0 ?
                <Hearts hearts={hearts} onPressHearts={onPressGEODLE} />
                :
                <GameOverCountryName countryName={country.name} />
            }

            {/* Guesses */}
            <Guesses guesses={guesses} />

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
                    country={country.name}
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

    //  Send
    sendButtonContainer: {
        flex: 2,
        minWidth: 60,
        alignSelf: 'center',
        paddingLeft: 5
    },

});
