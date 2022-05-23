
import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View, Text } from 'react-native';

import { countriesWithFlags, countryList, searchCountry } from '../data/CountryList';

import { HeaderRight, HeaderTitle, NextLevelArrow } from '../components/Header';
import Flag from './Flag';
import { GameOverCountryName, GlobeLink, ShareButton, GameOverMessage } from './GameOver';
import Guesses from './Guesses';
import Hearts from './Hearts';
import Autocomplete from './Autocomplete';
import { ExtraHearts, grantExtraHeart } from './ExtraHearts';

import { flushStorage, loadGlobalItem, loadItem, storeGlobalItem, storeItem } from '../util/DataStorage';
import { gameNumber } from '../util/GameNumber';
import refreshVersion from '../util/AppVersion';
import { navigateToBonusLevel1, navigateToLevel2 } from '../util/Navigation';
import { getBearingFromLatLon, getDistanceFromLatLonInKm } from '../util/DistanceCalculator';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function GuessFlag({ navigation }) {

    const [guess, setGuess] = useState("");
    const [autocompleteData, setAutocompleteData] = useState();
    const [country, setCountry] = useState(countriesWithFlags[gameNumber]);
    const [guesses, setGuesses] = useState([]);
    const [hearts, setHearts] = useState();
    const [extraHearts, setExtraHearts] = useState();
    const [bonusLevelAvailable, setBonusLevelAvailable] = useState();
    const [victory, setVictory] = useState();
    const [bonusLevelVictory, setBonusLevelVictory] = useState();
    const [level2Victory, setLevel2Victory] = useState();
    const [showBonusLevelAlert, setShowBonusLevelAlert] = useState(false);


    // Redirect to the bonus level
    // setTimeout(() => {
    //     navigateToBonusLevel1(navigation);
    // }, 3000)

    // Set up the level navigation header: title, next and previous level arrows
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "GEODLE",
            headerTitle: () => <HeaderTitle levelName={"Level 1"} />,
            headerRight: () => (
                <HeaderRight
                    victory={victory}
                    isBonusLevelAvailable={bonusLevelAvailable}
                    navigation={navigation}
                    navigateToBonusLevel={navigateToBonusLevel1}
                    navigateToNextLevel={navigateToLevel2}
                    hearts={hearts}
                    setHearts={setHearts}
                    extraHearts={extraHearts}
                    setExtraHearts={setExtraHearts}
                />
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

    useEffect(() => {
        // Force app refresh every now and then to retire outdated code
        refreshVersion();

        // Bonus level 
        if (guesses?.length >= 3 && !bonusLevelAvailable && !bonusLevelVictory) {
            setBonusLevelAvailable(true);
        }
        if (bonusLevelVictory == true) {
            setBonusLevelAvailable(false);
        }
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
        loadItem("bonusLevel1Victory", false, setBonusLevelVictory);
        loadItem("level2Victory", false, setLevel2Victory);
        loadItem("hearts", 6, setHearts);
        loadGlobalItem("extraHearts", 3, setExtraHearts);
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
        storeGlobalItem("extraHearts", extraHearts);
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
        if (guess == "bonus") {
            navigateToBonusLevel1(navigation);
        } else if (guess) {
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

                // Check for bonus level
                if (guesses.length == 3) {
                    setShowBonusLevelAlert(true);
                }

                // Process victory
                if (newVictory) {
                    setVictory(newVictory);
                    var newExtraHearts = grantExtraHeart(extraHearts, setExtraHearts);

                    if (bonusLevelVictory == true) {
                        // Redirect to the next level
                        setTimeout(() => {
                            navigateToLevel2(navigation);
                        }, 1000)
                    } else {
                        // Redirect to bonus level
                        setBonusLevelAvailable(true);
                        setShowBonusLevelAlert(true);
                    }
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
            <Flag
                flag={country.flag}
                flagAspectRatio={country.flagAspectRatio}
            />

            {/* Hearts */}
            <Hearts hearts={hearts} onPressHearts={onPressGEODLE} />
            {hearts == 0 && extraHearts == 0 ?
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


            <AwesomeAlert
                show={showBonusLevelAlert}
                showProgress={false}
                title="Bonus level"
                message="You unlocked a bonus level!"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, thanks"
                confirmText="Go there!"
                confirmButtonColor="green"
                onCancelPressed={() => {
                    setShowBonusLevelAlert(false);
                }}
                onConfirmPressed={() => {
                    navigateToBonusLevel1(navigation);
                    setShowBonusLevelAlert(false);
                }}
            />

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
