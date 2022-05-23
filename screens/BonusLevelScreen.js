import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import AwesomeAlert from 'react-native-awesome-alerts';

import { countriesWithFlags } from '../data/CountryList';
import { getHint, hints } from '../data/Hints';
import { gameNumber } from '../util/GameNumber';
import Flag from '../components/Flag';
import { HeaderLeft, HeaderTitle } from '../components/Header';
import { navigateToLevel1 } from '../util/Navigation';
import refreshVersion from '../util/AppVersion';
import { loadGlobalItem, loadItem, storeGlobalItem, storeItem } from '../util/DataStorage';
import { grantExtraHeart } from '../components/ExtraHearts';


export default function BonusLevelScreen({ navigation }) {

    const [selected, setSelected] = useState();
    const [showWelcomeAlert, setShowWelcomeAlert] = useState(true);
    const [showExtraHeartAlert, setShowExtraHeartAlert] = useState(false);
    const [country, setCountry] = useState(countriesWithFlags[gameNumber]);
    const [guesses, setGuesses] = useState([]);
    const [correct, setCorrect] = useState();
    const [victory, setVictory] = useState(false);
    const [level1Victory, setLevel1Victory] = useState();
    const [extraHearts, setExtraHearts] = useState();

    let hint = getHint(countriesWithFlags[gameNumber]);
    if (hint == null) {
        hint = hints[0];
    }

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

    useEffect(() => {
        if (victory == true) {
            setCorrect(hint.options.filter((option) => option.isCorrect)[0].text);
        }
        if (victory == false && guesses == []) {
            setShowWelcomeAlert(true);
        }
    }, [victory])

    // Store guesses, hearts and such on device
    const storeData = (newVictory, extraHearts, newGuesses) => {
        storeItem("bonusLevel1Victory", newVictory);
        storeItem("bonusLevel1Guesses", newGuesses);
        storeGlobalItem("extraHearts", extraHearts)
    };

    const loadData = async () => {
        loadItem("level1Victory", false, setLevel1Victory);
        loadItem("bonusLevel1Victory", false, setVictory);
        loadItem("bonusLevel1Guesses", [], setGuesses);
        loadItem("bonusLevel1Guesses", [], setGuesses);
        loadGlobalItem("extraHearts", 0, setExtraHearts);
    }
    // Header
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "GEODLE",
            headerTitle: () => <HeaderTitle levelName={"Bonus Level"} />,
            headerRight: () => { },
            headerLeft: () => <HeaderLeft country={country} navigation={navigation} navigateBack={navigateToLevel1} />
        }, [navigation]);
    })

    function getConditionalOptionStyle(option) {
        let style = [styles.optionContainer];
        if (option == selected) {
            style.push(styles.selectedOptionContainer);
        } else if (option.text == correct) {
            style.push(styles.correctOptionContainer);
        } else if (guesses?.includes(option.text)) {
            style.push(styles.wrongOptionContainer);
        }
        return style;
    }

    function Option({ option }) {
        return (
            <TouchableOpacity style={getConditionalOptionStyle(option)}
                disabled={victory || guesses.includes(option.text)}
                onPress={() => {
                    if (!guesses.includes(option.text)) {
                        setSelected(option);
                    }
                }}
                onLongPress={() => {
                    if (option.isCorrect) {
                        var newVictory = true;
                        setCorrect(option.text);
                        setVictory(true);
                        if (guesses.length == 0) {
                            setShowExtraHeartAlert(true);
                            var newExtraHearts = grantExtraHeart(extraHearts, setExtraHearts);
                        }
                    } else {
                        guesses.push(option.text);
                    }
                    storeData(newVictory, newExtraHearts, guesses);
                    setSelected(null);
                }}
            >
                <Text style={styles.optionText}>
                    {option.text}
                </Text>
            </TouchableOpacity>
        );
    }


    return (
        <View style={styles.container}>

            <Flag
                flag={country.flag}
                flagAspectRatio={country.flagAspectRatio}
            />

            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{hint.text}</Text>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsRowContainer}>
                    <Option option={hint.options[0]} />
                    <Option option={hint.options[1]} />
                </View>
                <View style={styles.optionsRowContainer}>
                    <Option option={hint.options[2]} />
                    <Option option={hint.options[3]} />
                </View>

                {selected != null ?
                    <Text style={styles.hintText}>Long press to confirm</Text>
                    :
                    <View style={styles.hintText} />
                }
            </View>

            <AwesomeAlert
                show={showWelcomeAlert}
                title="Bonus Level"
                message="You lose no hearts here, but have a chance to win one!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                onDismiss={() => {
                    setShowWelcomeAlert(false);
                }}
            />

            <AwesomeAlert
                show={showExtraHeartAlert}
                title="Bonus Level"
                message="You won an extra heart!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
            />

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

    // Question
    questionContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 22
    },

    // Answers
    optionsContainer: {
        flex: 9,
        justifyContent: 'flex-end'
    },
    optionsRowContainer: {
        flexDirection: 'row',
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionContainer: {
        borderWidth: 1,
        borderRadius: 10,
        width: 170,
        height: 50,
        marginHorizontal: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
    selectedOptionContainer: {
        backgroundColor: '#fc9d03'
    },
    correctOptionContainer: {
        backgroundColor: '#35ad23'
    },
    wrongOptionContainer: {
        backgroundColor: '#c24029'
    },
    optionText: {
        fontSize: 18,
        marginHorizontal: 5
    },
    hintText: {
        alignSelf: 'center',
        fontSize: 22,
        minHeight: 26,
        marginBottom: 18
    }
});
