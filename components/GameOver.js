import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking'

import shareButton from '../img/send.png'
import globeButton from '../img/world.png'
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

    let hearts;
    await loadItem("hearts", maxHearts, (heartsFromStorage) => hearts = heartsFromStorage);
    shareString += "I used " + (maxHearts - hearts) + " hearts ";

    let level2Guesses;
    await loadItem("level2Guesses", [], (guessesFromStorage) => level2Guesses = guessesFromStorage);

    let level3Guesses;
    await loadItem("wrong", [], (guessesFromStorage) => level3Guesses = guessesFromStorage);

    if (level3Guesses.length > 0) {
        shareString += "for 3 levels:";
    } else if (level2Guesses.length > 0) {
        shareString += "for 2 levels:";
    } else {
        shareString += "on level 1:"
    }

    shareString += "\n\nLevel 1: ";
    var guesses;
    await loadItem("guesses", [], (guessesFromStorage) => guesses = guessesFromStorage)
    for (const guess of guesses) {
        shareString += coordNamesToSmileys.filter(
            (entry) => entry.coord == guess.direction
        )[0].smiley;
    }
    if (level2Guesses.length > 0) {
        shareString += "\nLevel 2: ";
        for (const guess of level2Guesses) {
            shareString += guess
        }
    }

    let level3Victory;
    await loadItem("level3Victory", false, (victoryFromStorage) => level3Victory = victoryFromStorage);
    if (level3Guesses.length > 0 || level3Victory == true) {
        shareString += "\nLevel 3: ";
        for (const guess of level3Guesses) {
            shareString += "🟥"
        }
        if (level3Victory == true) {
            shareString += "✅"
        }
    }

    shareString += "\n\nhttps://motrhelp.github.io/geodle/"

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
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // margin: 10
    },
    pictogram: {
        // flex: 1,
        minHeight: 30,
        aspectRatio: 512 / 512,
        marginHorizontal: 10,
    },

});
