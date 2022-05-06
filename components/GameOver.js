import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking'

import shareButton from '../img/send.png'
import globeButton from '../img/world.png'

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

const onPressShare = (guesses, hearts) => {
    let shareString = "";
    for (let i = 0; i < 5; i++) {
        if (i < hearts) {
            shareString += "♥ ";
        } else {
            shareString += "♡ ";
        }
    }
    for (const guess of guesses) {
        shareString += "\n" + guess.direction + " " + guess.distance;
    }
    shareString += "\n" + "http://motrhelp.github.io/geodle"
    Clipboard.setString(shareString);
    alert("Results copied to clipboard, share on!")
}

const onPressGoogleMaps = (countryName) => {
    var googleMapsUrl = "https://www.google.com/maps/place/";
    Linking.openURL(googleMapsUrl + countryName);
}

const onPressNextLevel = (navigation, country, hearts) => {
    navigation.navigate("GuessCapital", { country, hearts })
}

export function GameOverLinks({ guesses, hearts, country, navigation }) {
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
                onPress={() => onPressShare(guesses, hearts)}
            >
                <Image
                    style={styles.pictogram}
                    source={shareButton}
                />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({

    // Game over
    gameOver: {
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: "bold",
    },

    // Share etc links
    linksContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 30
    },
    pictogram: {
        flex: 1,
        minHeight: 30,
        aspectRatio: 512 / 512,
        marginHorizontal: 20,
    },
    nextLevelArrow: {
        flex: 1,
        minHeight: 30,
        aspectRatio: 512 / 512,
        marginHorizontal: 20,
        alignSelf: 'flex-end',
    }

});
