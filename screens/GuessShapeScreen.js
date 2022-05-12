import { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import countriesWithFlags, { countryList } from '../data/CountryList';
import { gameNumber } from '../util/GameNumber';
import Hearts from '../components/Hearts';
import { flushStorage, loadItem } from '../util/DataStorage';
import { TouchableOpacity } from 'react-native-web';
import { GameOverMessage, ShareButton, GlobeLink } from '../components/GameOver';
import leftArrow from '../img/left-arrow.png'
import { navigateToLevel2 } from '../util/Navigation';

export default function GuessShapeScreen({ navigation }) {

    const [country, setCountry] = useState(countriesWithFlags[gameNumber]);
    const [hearts, setHearts] = useState();
    const [selected, setSelected] = useState();
    const [wrong, setWrong] = useState([]);
    const [correct, setCorrect] = useState();
    const [victory, setVictory] = useState(false);
    const [shapes, setShapes] = useState([
        countryList[14], countryList[15], countryList[16], countryList[17], countryList[18],
        countryList[19], countryList[20], countryList[21], countryList[22], countryList[23],
        countryList[24], countryList[25], countryList[26]]
    );

    // Load hearts and such on startup and navigation
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });

        return unsubscribe;
    }, [navigation]);

    const loadData = async () => {
        loadItem("hearts", 6, setHearts);
        loadItem("level3Victory", false, setVictory);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'GEODLE\n Level 3',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerBackButtonMenuEnabled: false,
            headerTitle: () => <Text style={styles.headerTitle}>GEODLE{'\n'} Level 3</Text>,
            headerRight: () => null,
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

    function Shape({ countryOnScreen }) {
        return (
            <TouchableOpacity style={styles.shapeContainer}
                disabled={victory || hearts == 0}
                onPress={() => {
                    if (countryOnScreen == selected) {
                        setSelected(null);
                    } else {
                        setSelected(countryOnScreen);
                    }
                }}
                onLongPress={() => {
                    if (countryOnScreen == selected) {
                        if (countryOnScreen == country) {
                            setCorrect(countryOnScreen);
                            setVictory(true);
                        } else {
                            wrong.push(countryOnScreen);
                            setHearts(hearts - 1);
                            setSelected(null);
                        }
                    } else {
                        setSelected(countryOnScreen);
                    }
                    // alert(" ❤️ Thanks for testing  ❤️ \nStan is still working on this one")
                }}
            >
                <Image style={[
                    styles.shapeImage,
                    selected == countryOnScreen ? styles.selectedImage :
                        wrong.includes(countryOnScreen) ? styles.confirmedImage : null,
                    correct == countryOnScreen ? styles.correctImage : null
                ]}
                    source={countryOnScreen.shape}
                    pointerEvents="none"
                />
            </TouchableOpacity>
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

            {!victory && hearts > 0 ?
                < View style={styles.hintContainer}>
                    {selected == null ?
                        <Text style={styles.hintText}>Can you guess the shape of {country.name}?</Text>
                        :
                        <Text style={styles.hintText}>Long press to confirm</Text>
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

            {
                hearts == 0 || victory ?
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
        tintColor: "#b36b00"
    },
    confirmedImage: {
        tintColor: '#990000',
    },
    correctImage: {
        tintColor: '#006600',
    }
});
