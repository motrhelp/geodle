import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import Header from '../components/Header';
import leftArrow from '../img/left-arrow.png';

export default function GuessCapital({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 1, alignSelf: 'center' }}>
        <Text style={{ fontSize: 30 }}>Whole new level!</Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate("GuessFlag") }} >
          <Image
            style={styles.nextLevelArrow}
            source={leftArrow}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center'
  },
  nextLevelArrow: {
    flex: 1,
    minHeight: 50,
    aspectRatio: 512 / 512,
    marginHorizontal: 20,
    alignSelf: 'center',
    marginTop: 50
  }
});
