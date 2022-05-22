import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { GlobeLink, ShareButton } from './GameOver';

import leftArrow from '../img/left-arrow.png'
import rightArrow from '../img/right-arrow.png'

export function HeaderTitle({ levelName }) {
    return (
        <Text style={styles.headerTitle}>GEODLE{'\n'} {levelName}</Text>
    )
}

export function HeaderLeft({ navigation, navigateBack, country, showGlobe }) {
    return (
        <View style={styles.rowContainer}>
            {navigateBack != null ?
                <TouchableOpacity
                    style={styles.navigationArrowContainer}
                    onPress={() => navigateBack(navigation)}
                >
                    <Image
                        style={styles.previousLevelArrow}
                        source={leftArrow}
                    />
                </TouchableOpacity>
                :
                null
            }
            {showGlobe == true ?
                <GlobeLink country={country} />
                :
                null
            }
            < ShareButton />
        </View>
    )
}

export function NextLevelArrow({ navigation, navigateToNextLevel }) {
    return (
        <View>
            <TouchableOpacity
                style={styles.navigationArrowContainer}
                onPress={() => navigateToNextLevel(navigation)}
            >
                <Text style={styles.nextLevelText}>
                    NEXT{'\n'}LEVEL
                </Text>
                <Image
                    style={styles.nextLevelArrow}
                    source={rightArrow}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
    },
    previousLevelArrow: {
        flex: 1,
        minHeight: 25,
        aspectRatio: 512 / 512,
        marginLeft: 20,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginHorizontal: 50,
        textAlign: 'center'
    },
    navigationArrowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nextLevelText: {
        fontWeight: 'bold'
    },
    nextLevelArrow: {
        flex: 1,
        minHeight: 25,
        aspectRatio: 512 / 512,
        marginRight: 20,
    },
})

