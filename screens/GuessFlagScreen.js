import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import GuessFlag from '../components/GuessFlag';

export default function GuessFlagScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <GuessFlag navigation={navigation} />
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
