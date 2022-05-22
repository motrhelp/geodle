import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking'

import shareButton from '../img/send.png'
import globeButton from '../img/world.png'
import extraHeart from '../img/heart-2.png'
import { loadItem } from '../util/DataStorage';
import { maxHearts } from './Hearts';

const coordNamesToSmileys = [
    { coord: "→", smiley: "➡️" },
    { coord: "↘", smiley: "↘️" },
    { coord: "↓", smiley: "⬇️" },
    { coord: "↙", smiley: "↙️" },
    { coord: "←", smiley: "⬅️" },
    { coord: "↖", smiley: "↖" },
    { coord: "↑", smiley: "⬆️" },
    { coord: "↗", smiley: "↗️" },
    { coord: "✓", smiley: "✅" },
];

export function GameOverCountryName({ countryName }) {
    return (
        <Text style={styles.gameOver}>{countryName.toUpperCase()}</Text>
    );
}

export function GameOverMessage({ victory }) {
    return (
        <View>
            {victory ?
                <Text style={styles.gameOver}>VICTORY</Text>
                :
                <Text style={styles.gameOver}>GAME OVER</Text>
            }
        </View>
    );
}

const onPressShare = async () => {
    let shareString = "Can you beat me in Geodle?\n\n";

    // Load level 1
    let level1Guesses;
    await loadItem("guesses", 0, (guessesFromStorage) => level1Guesses = guessesFromStorage);
    let level1Victory;
    await loadItem("level1Victory", false, (victoryFromStorage) => level1Victory = victoryFromStorage);

    // Load level 2
    let level2Guesses;
    await loadItem("level2Guesses", [], (guessesFromStorage) => level2Guesses = guessesFromStorage);
    let level2Victory;
    await loadItem("level2Victory", false, (victoryFromStorage) => level2Victory = victoryFromStorage);

    // Load level 3
    let level3Guesses;
    await loadItem("level3Guesses", [], (guessesFromStorage) => level3Guesses = guessesFromStorage);
    let level3Victory;
    await loadItem("level3Victory", false, (victoryFromStorage) => level3Victory = victoryFromStorage);

    // Count hearts used
    let heartsUsed = level1Guesses.length + level2Guesses.length + level3Guesses.length;
    if (level1Victory) {
        heartsUsed--;
    }
    if (level2Victory) {
        heartsUsed--;
    }
    if (level3Victory) {
        heartsUsed--;
    }
    shareString += "I used " + heartsUsed + " hearts ";
    if (level3Guesses.length > 0) {
        shareString += "for 3 levels:";
    } else if (level2Guesses.length > 0) {
        shareString += "for 2 levels:";
    } else {
        shareString += "on level 1:"
    }

    // Summarize level 1
    shareString += "\n\nLevel 1: ";
    for (const guess of level1Guesses) {
        shareString += coordNamesToSmileys.filter(
            (entry) => entry.coord == guess.direction
        )[0].smiley;
    }

    // Summarize level 2
    if (level2Guesses.length > 0) {
        shareString += "\nLevel 2: ";
        for (const guess of level2Guesses) {
            shareString += guess
        }
    }

    // Summarize level 3
    if (level3Guesses.length > 0 || level3Victory == true) {
        shareString += "\nLevel 3: ";
        for (const guess of level3Guesses) {
            shareString += guess.result;
        }
    }

    // Add link
    shareString += "\n\nhttps://motrhelp.github.io/geodle/"

    // Copy to share
    Clipboard.setStringAsync(shareString);
    alert("Results copied to clipboard, share on!")
}

const onPressGoogleMaps = (countryName) => {
    var googleMapsUrl = "https://www.google.com/maps/place/";
    Linking.openURL(googleMapsUrl + countryName);
}

const onPressNextLevel = (navigation, country, hearts) => {
    navigation.navigate("GuessCapital", { country, hearts })
}

export function GameOverLinks({ country }) {
    return (
        <View style={styles.linksContainer}>
            <TouchableOpacity
                onPress={() => onPressGoogleMaps(country.name)}
            >
                <Image
                    style={styles.pictogram}
                    source={globeButton}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPressShare()}
            >
                <Image
                    style={styles.pictogram}
                    source={shareButton}
                />
            </TouchableOpacity>
        </View>
    );
}

export function GlobeLink({ country }) {
    return (
        <TouchableOpacity
            onPress={() => onPressGoogleMaps(country.name)}
        >
            <Image
                style={styles.pictogram}
                source={globeButton}
            />
        </TouchableOpacity>
    );
}

export function ShareButton() {
    return (
        <TouchableOpacity
            onPress={() => onPressShare()}
        >
            <Image
                style={styles.pictogram}
                source={shareButton}
            />
        </TouchableOpacity>
    );
}


export function ExtraHearts({ hearts, setHearts }) {

    function onPressExtraHearts() {
        setHearts(hearts + 1);
    }

    return (
        <TouchableOpacity
            style={styles.linksContainer}
            onPress={() => onPressExtraHearts()}
        >
            <Image
                style={styles.pictogram}
                source={extraHeart}
            />
            <Text style={styles.extraHeartsText}>x 6</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

    // Game over
    gameOver: {
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: "bold",
        margin: 5
    },

    // Share etc links
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pictogram: {
        // flex: 1,
        minHeight: 30,
        aspectRatio: 512 / 512,
        marginHorizontal: 10,
    },

    // Extra hearts
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 10
    },
    extraHeartsText: {
        fontSize: 22,
        fontWeight: "bold"
    },

});
