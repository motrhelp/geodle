import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Autocomplete({ autocompleteData, enterGuess }) {

    return (

        <View style={styles.inputWithAutocompleteContainer}>
            <View style={styles.autocompleteContainer}>
                {autocompleteData?.length == 0 ?
                    null
                    :
                    <FlatList
                        data={autocompleteData}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => enterGuess(item.name)}
                            >
                                <Text style={styles.autocompleteItem}>{item.name}</Text>
                            </TouchableOpacity>
                        }
                        keyboardShouldPersistTaps={'handled'} // Avoid keyboard flickering up and down when a country is selected
                        keyExtractor={(item, index) => index.toString()}  // This is just to remove keys warning
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    gameContainer: {
        flex: 9,
        alignItems: 'center',
    },

    // Autocomplete
    inputWithAutocompleteContainer: {
        flex: 4,
        padding: 10,
        paddingBottom: 20,
        minHeight: 50,
        width: '100%',
        justifyContent: 'flex-end',
        maxHeight: 50
    },
    autocompleteContainer: {
        maxHeight: 160
    },
    autocompleteItem: {
        fontSize: 30
    },

    // Input
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50,
        minHeight: 40,
        justifyContent: 'center',
        marginBottom: 20
    },

    input: {
        flex: 8,
        borderWidth: 1,
        fontSize: 25,
        maxWidth: '90%',
    },

    //  Send
    sendButtonContainer: {
        flex: 2,
        minWidth: 60,
        alignSelf: 'center',
        paddingLeft: 5
    },

    // Share etc links
    linksContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20
    },
    shareButton: {
        flex: 1,
        minHeight: 30,
        aspectRatio: 512 / 512,
        marginHorizontal: 20,
    }

});
