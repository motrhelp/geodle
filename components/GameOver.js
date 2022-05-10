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
    let shareString = "http://motrhelp.github.io/geodle\n\n";

    var hearts;
    await loadItem("hearts", maxHearts, (heartsFromStorage) => hearts = heartsFromStorage);
    for (let i = 0; i < maxHearts; i++) {
        if (i < hearts) {
            shareString += "🖤";
        } else {
            shareString += "🤍";
        }
    }

    shareString += "\n\nLevel 1: ";
    var guesses;
    await loadItem("guesses", [], (guessesFromStorage) => guesses = guessesFromStorage)
    for (const guess of guesses) {
        shareString += coordNamesToSmileys.filter((entry) => entry.coord == guess.direction)[0].smiley;
    }

    shareString += "\nLevel 2: ";
    var level2Guesses;
    await loadItem("level2Guesses", [], (guessesFromStorage) => level2Guesses = guessesFromStorage);
    for (const guess of level2Guesses) {
        shareString += guess
    }
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
