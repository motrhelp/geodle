import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import extraHeart from '../img/heart-2.png'
import { maxHearts } from './Hearts';

export function grantExtraHeart(extraHearts, setExtraHearts) {
    let newExtraHearts = extraHearts < maxHearts ? extraHearts + 1 : extraHearts;
    setExtraHearts(newExtraHearts);
    return newExtraHearts;
}

export function ExtraHearts({ hearts, setHearts, extraHearts, setExtraHearts }) {

    function onPressExtraHearts() {
        if (extraHearts > 0 && hearts < maxHearts) {
            setHearts(hearts + 1);
            setExtraHearts(extraHearts - 1);
        }
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
            <Text style={styles.extraHeartsText}>x {extraHearts}</Text>
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
