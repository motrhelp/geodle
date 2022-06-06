import { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import MapView from 'react-native-maps';

export default function GuessCountryLocationScreen({ navigation }) {

    // Force app refresh every now and then to retire outdated code
    useEffect(() => {
        // refreshVersion();
    })

    // Load hearts and such on startup
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        // loadItem("level3Guesses", [], setGuesses);
        // loadItem("correct", null, setCorrect);
        // loadGlobalItem("extraHearts", 0, setExtraHearts);
        // loadItem("hearts", 6, setHearts);
        // loadItem("level3Victory", country.shape == null, setVictory); // the default value is a workaround to catch countries without shapes
    }

    var mapStyle = [
        { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] },
        { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }
    ]
    
    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}
            />
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

});
