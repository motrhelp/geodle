import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GuessCapitalScreen from './screens/GuessCapitalScreen';
import GuessFlagScreen from './screens/GuessFlagScreen';
import GuessShapeScreen from './screens/GuessShapeScreen';
import BonusLevelScreen from './screens/BonusLevelScreen';

import { loadItem } from './util/DataStorage';
import { bonusLevel1Name, level1Name, level2Name, level3Name } from './util/Navigation';
const Stack = createNativeStackNavigator();

export default function App() {

  const [level1Victory, setLevel1Victory] = useState(null);
  const [level2Victory, setLevel2Victory] = useState(null);

  useEffect(() => {
    loadItem("level1Victory", false, setLevel1Victory);
    loadItem("level2Victory", false, setLevel2Victory);
  }, []);

  return level2Victory != null ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={level1Victory ? level2Victory ? level3Name : level2Name : level1Name}
        screenOptions={{
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name={level1Name}
          component={GuessFlagScreen}
        />
        <Stack.Screen
          name={bonusLevel1Name}
          component={BonusLevelScreen}
        />
        <Stack.Screen
          name={level2Name}
          component={GuessCapitalScreen}
        />
        <Stack.Screen
          name={level3Name}
          component={GuessShapeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
    : null
}
