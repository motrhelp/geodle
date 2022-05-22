import { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { countriesWithFlags, countriesWithShape } from '../data/CountryList';
import { gameNumber, generateConsistentRandomNumber } from '../util/GameNumber';
import Hearts from '../components/Hearts';
import { flushStorage, loadGlobalItem, loadItem, storeGlobalItem, storeItem } from '../util/DataStorage';
import { TouchableOpacity } from 'react-native-web';
import { GameOverMessage, ShareButton, GlobeLink } from '../components/GameOver';
import leftArrow from '../img/left-arrow.png'
import { navigateToLevel2 } from '../util/Navigation';
import refreshVersion from '../util/AppVersion';
import { ExtraHearts, grantExtraHeart } from '../components/ExtraHearts';

export default function GuessShapeScreen({ navigation }) {

    const [country, setCountry] = useState(countriesWithFlags[gameNumber]);
    const [hearts, setHearts] = useState();
    const [extraHearts, setExtraHearts] = useState();
    const [selected, setSelected] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [correct, setCorrect] = useState();
    const [victory, setVictory] = useState(null);
    const [shapes, setShapes] = useState(selectShapes());

    function selectShapes() {
        let shapes = [];

        for (let i = 0; shapes.length < 9; i++) {
            let countryShapeCandidate = countriesWithShape[generateConsistentRandomNumber(i, countriesWithShape.length)];
            if (!shapes.includes(countryShapeCandidate)) {
                shapes.push(countryShapeCandidate);
            }
        }

        if (!shapes.includes(country)) {
            shapes[generateConsistentRandomNumber(0, 9)] = country;
        }

        return shapes;
    }

    // Force app refresh every now and then to retire outdated code
    useEffect(() => {
        refreshVersion();
    })

    // Load hearts and such on startup
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        loadItem("level3Guesses", [], setGuesses);
        loadItem("correct", null, setCorrect);
        loadGlobalItem("extraHearts", 3, setExtraHearts);
        loadItem("hearts", 6, setHearts);
        loadItem("level3Victory", country.shape == null, setVictory); // the default value is a workaround to catch countries without shapes
    }

    useEffect(() => {
        storeItem("level3Guesses", guesses);
        storeItem("correct", correct);
        storeGlobalItem("extraHearts", extraHearts);
        storeItem("hearts", hearts);
        storeItem("level3Victory", victory);
    }, [victory, hearts, extraHearts]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'GEODLE\n Level 3',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerBackButtonMenuEnabled: false,
            headerTitle: () => <Text style={styles.headerTitle}>GEODLE{'\n'} Level 3</Text>,
            headerRight: () =>
                <ExtraHearts
                    hearts={hearts}
                    setHearts={setHearts}
                    extraHearts={extraHearts}
                    setExtraHearts={setExtraHearts}
                />,
            headerLeft: () => (
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        style={styles.nextLevelArrowContainer}
                        onPress={() => navigateToLevel2(navigation)}
                    >
                        <Image
                            style={styles.previousLevelArrow}
                            source={leftArrow}
                        />
                        {hearts == 0 || victory
                            ?
                            <GlobeLink country={country} />
                            : null
                        }
                        <ShareButton />
                    </TouchableOpacity>
                </View>
            )
        }, [navigation]);
    })

    function getShapeConditionalStyle(countryOnScreen) {
        // Default inactive image
        let style = [styles.shapeImage];

        if (selected == countryOnScreen) {
            // Highlighted upon selection
            style.push(styles.selectedImage);
        }

        // Shape style after confirmation
        if (correct == countryOnScreen.code) {
            // Correct shape 
            style.push(styles.correctImage);
        } else if (guesses.map(guess => guess.code).includes(countryOnScreen.code)) {
            // Wrong shape 
            style.push(styles.wrongImage);
        }
        return style;
    }

    function Shape({ countryOnScreen }) {
        return (
            <TouchableOpacity style={styles.shapeContainer}
                disabled={victory || hearts == 0}
                onPress={() => {
                    if (countryOnScreen == selected) {
                        setSelected(null);
                    } else if (!guesses.map(guess => guess.code).includes(countryOnScreen.code)) {
                        setSelected(countryOnScreen);
                    }
                }}
                onLongPress={() => {
                    if (!guesses.map(guess => guess.code).includes(countryOnScreen.code)) {
                        setSelected(countryOnScreen);
                        if (countryOnScreen == country) {
                            guesses.push({ code: countryOnScreen.code, result: "✅" });
                            setCorrect(countryOnScreen.code);
                            setVictory(true);
                            grantExtraHeart(extraHearts, setExtraHearts);
                        } else {
                            guesses.push({ code: countryOnScreen.code, result: "🟥" });
                            setHearts(hearts - 1);
                            setSelected(null);
                        }
                    }
                }}
            >
                <Image style={getShapeConditionalStyle(countryOnScreen)}
                    source={countryOnScreen.shape}
                    pointerEvents="none"
                />
            </TouchableOpacity >
        );
    }

    // Tester's "refresh" cheat
    const onPressGEODLE = () => {
        flushStorage();
        window.location.reload(false);
    }

    return (
        <View style={styles.container}>
            <Hearts hearts={hearts} onPressHearts={onPressGEODLE} />

            {(!victory && hearts > 0) || country.shape == null ?
                < View style={styles.hintContainer}>
                    {country.shape != null ?
                        selected == null ?
                            <Text style={styles.hintText}>Can you guess the shape of {country.name}?</Text>
                            :
                            <Text style={styles.hintText}>Long press to confirm</Text>
                        :
                        <View>
                            <Text style={styles.hintText}>Sorry, the game doesn't have {country.name} shape yet.</Text>
                        </View>
                    }
                </View>
                :
                null
            }

            <View style={styles.shapeListContainer}>
                <Shape countryOnScreen={shapes[0]} />
                <Shape countryOnScreen={shapes[1]} />
                <Shape countryOnScreen={shapes[2]} />
            </View>
            <View style={styles.shapeListContainer}>
                <Shape countryOnScreen={shapes[3]} />
                <Shape countryOnScreen={shapes[4]} />
                <Shape countryOnScreen={shapes[5]} />
            </View>
            <View style={styles.shapeListContainer}>
                <Shape countryOnScreen={shapes[6]} />
                <Shape countryOnScreen={shapes[7]} />
                <Shape countryOnScreen={shapes[8]} />
            </View>

            {hearts == 0 || victory ?
                <GameOverMessage victory={victory} />
                :
                null
            }

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

    // Hint
    hintContainer: {
        flex: 1,
        alignItems: 'center',
    },
    hintText: {
        fontSize: 18
    },

    // Shapes
    shapeListContainer: {
        flex: 8,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    shapeImage: {
        width: 80,
        height: 80,
        aspectRatio: 512 / 512,
        margin: 20
    },
    selectedImage: {
        width: 120,
        height: 120,
        filter: 'invert(38%) sepia(97%) saturate(628%) hue-rotate(4deg) brightness(95%) contrast(101%)',
    },
    wrongImage: {
        filter: 'invert(12%) sepia(93%) saturate(3011%) hue-rotate(352deg) brightness(92%) contrast(122%)',
    },
    correctImage: {
        width: 120,
        height: 120,
        filter: 'invert(21%) sepia(92%) saturate(1173%) hue-rotate(91deg) brightness(103%) contrast(108%)',
    }
});
