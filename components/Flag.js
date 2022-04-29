
import { StyleSheet, Image } from 'react-native';


export default function Flag({ flag } ) {

    return (
        <Image
            style={styles.flag}
            resizeMode='stretch'
            source={flag}
        />
    );
}

const styles = StyleSheet.create({

    flag: {
        flex: 9,
        alignSelf: 'center',
        borderWidth: 1,
        aspectRatio: 512 / 341,
        marginTop: 20
    }

});
