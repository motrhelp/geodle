import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import GameContainer from '../components/GameContainer';
import Header from '../components/Header';

export default function GuessFlag({ navigation }) {
  return (
      <View style={styles.container}>
        <Header />
        <GameContainer navigation={navigation} />
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
});
