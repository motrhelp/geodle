
import { StyleSheet, Image } from 'react-native';


export default function Flag({ flag, flagAspectRatio }) {

    function getAspectRatio() {
        return flagAspectRatio == null ? { aspectRatio: 1.5 } : { aspectRatio: flagAspectRatio }
    }

    return (
        <Image
            style={[styles.flag, getAspectRatio()]}
            resizeMode='stretch'
            source={flag}
        />
    );
}

const styles = StyleSheet.create({

    flag: {
        flex: 9,
        alignSelf: 'center',
        marginTop: 20
    }

});
