import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Guesses({ guesses }) {

  return (

    <View style={styles.guessesContainer}>
      <FlatList
        data={guesses}
        renderItem={({ item }) =>
          <View style={styles.guessContainer}>
            <Text style={styles.guessName}>{item.name}</Text>
            <Text style={styles.guessDirection}>{item.direction}</Text>
            <Text style={styles.guessDistance}>{item.distance}</Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}  // This is just to remove keys warning
      />
    </View>

  );
}

const styles = StyleSheet.create({

  // Guesses
  guessesContainer: {
    flex: 9,
    minWidth: '80%',
    minHeight: 100,
    marginLeft: 10,
    marginTop: 10,
  },
  guessContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  guessFlag: {
    flex: 1,
    fontSize: 16,
  },
  guessName: {
    flex: 7,
    fontSize: 18,
  },
  guessDirection: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold'
  },
  guessDistance: {
    flex: 3,
    fontSize: 18,
  }

});
