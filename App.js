import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import GameContainer from './components/GameContainer';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>GEODLE</Text>
      </View>
      <GameContainer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center'
  },

  // Header
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
