import { StatusBar } from 'expo-status-bar';
import { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import AwesomeAlert from 'react-native-awesome-alerts';

import { countriesWithFlags } from '../data/CountryList';
import { getHint } from '../data/Hints';
import { gameNumber } from '../util/GameNumber';
import Flag from '../components/Flag';
import { HeaderLeft, HeaderTitle } from '../components/Header';
import { navigateToLevel1 } from '../util/Navigation';


export default function BonusLevelScreen({ navigation }) {

    const [selected, setSelected] = useState();
    const [showAlert, setShowAlert] = useState(true);
    const [country, setCountry] = useState(countriesWithFlags[gameNumber]);
    const [guesses, setGuesses] = useState([]);
    const [correct, setCorrect] = useState();

    const hint = getHint(countriesWithFlags[gameNumber]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "GEODLE",
            headerTitle: () => <HeaderTitle levelName={"Bonus Level"} />,
            headerRight: () => { },
            headerLeft: () => <HeaderLeft country={country} navigateBack={navigateToLevel1} />
        }, [navigation]);
    })

    function getConditionalOptionStyle(option) {
        let style = [styles.optionContainer];
        if (option == selected) {
            style.push(styles.selectedOptionContainer);
        } else if (option == correct) {
            style.push(styles.correctOptionContainer);
        } else if (guesses.includes(option)) {
            style.push(styles.wrongOptionContainer);
        }
        return style;
    }

    function Option({ option }) {
        return (
            <TouchableOpacity style={getConditionalOptionStyle(option)}
                onPress={() => {
                    setSelected(option);
                }}
                onLongPress={() => {
                    if (option.isCorrect) {
                        setCorrect(option);
                    } else {
                        guesses.push(option);
                    }
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
                show={showAlert}
                // showProgress={true}
                title="Bonus Level"
                message="You lose no hearts here, but gain an extra one if win!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                onDismiss = {() => {
                    setShowAlert(false);
                }}
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
