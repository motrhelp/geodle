import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import rightArrow from '../img/right-arrow.png'

export function HeaderTitle({ levelName }) {
    return (
        <Text style={styles.headerTitle}>GEODLE{'\n'} {levelName}</Text>
    )
}

export function NextLevelArrow({ navigation, navigateToNextLevel }) {
    return (
        <View>
            <TouchableOpacity
                style={styles.nextLevelArrowContainer}
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
    // Navigation header
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginHorizontal: 50
    },
    nextLevelArrowContainer: {
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

