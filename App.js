import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>GEOGLE</Text>
      </View>
      <View style={styles.gameContainer}></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "sdfsd"
  },
  gameContainer: {
    flex: 9
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold"
  }

});
