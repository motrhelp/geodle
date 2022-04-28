
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>GEODLE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15
    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
    },

});
