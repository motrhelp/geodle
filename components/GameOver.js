import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking'
import AsyncStorage from '@react-native-async-storage/async-storage';

import countryList from '../data/CountryList';
import { getDistanceFromLatLonInKm, getBearingFromLatLon } from '../util/DistanceCalculator';
import ramdomEmoji from '../util/RandomEmoji';
import shareButton from '../img/send.png'
import globeButton from '../img/world.png'

import Flag from './Flag';
import Hearts from './Hearts';
import Guesses from './Guesses';

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

export function GameOverLinks({ guesses, hearts, countryName }) {
    return (
        <View style={styles.linksContainer}>
            <TouchableOpacity
                onPress={() => onPressGoogleMaps(countryName)}
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
        margin: 20
    },
    pictogram: {
        flex: 1,
        minHeight: 30,
        aspectRatio: 512 / 512,
        marginHorizontal: 20,
    }

});
