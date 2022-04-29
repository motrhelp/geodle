import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import heart from '../img/heart.png';
import lostHeart from '../img/lostHeart.png';

export default function Hearts({ hearts, onPressHearts }) {
    return (
        <TouchableOpacity onPress={onPressHearts}
            style={styles.heartsContainer}>

            <Image
                style={styles.heartImage}
                source={hearts > 0 ? heart : lostHeart}
            />
            <Image
                style={styles.heartImage}
                source={hearts > 1 ? heart : lostHeart}
            />
            <Image
                style={styles.heartImage}
                source={hearts > 2 ? heart : lostHeart}
            />
            <Image
                style={styles.heartImage}
                source={hearts > 3 ? heart : lostHeart}
            />
            <Image
                style={styles.heartImage}
                source={hearts > 4 ? heart : lostHeart}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    heartsContainer: {
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        minWidth: 250,
        minHeight: 50,
    },
    heartImage: {
        flex: 1,
        maxHeight: 25,
        maxWidth: 25,
        aspectRatio: 512 / 512
    },

});
