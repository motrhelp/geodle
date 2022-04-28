import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Guesses({ guesses }) {

  return (

    <View style={styles.guessesContainer}>
      <FlatList
        data={guesses}
        renderItem={({ item }) =>
          <View style={styles.guessContainer}>
            <Text style={styles.guessFlag}>{item.emoji}</Text>
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
    paddingTop: 30,
    minWidth: '80%'
  },
  guessContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  guessFlag: {
    flex: 1,
    fontSize: 15,
  },
  guessName: {
    flex: 5,
    fontSize: 15,
  },
  guessDirection: {
    flex: 1,
    fontSize: 15,
  },
  guessDistance: {
    flex: 3,
    fontSize: 15,
  }

});
