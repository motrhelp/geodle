import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GuessCapitalScreen from './screens/GuessCapitalScreen';
import GuessFlagScreen from './screens/GuessFlagScreen';

import { loadItem } from './util/DataStorage';
import { level1Name, level2Name, level3Name } from './util/Navigation';
import GuessShapeScreen from './screens/GuessShapeScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [initialRoute, setInitialRoute] = useState(null);
  const [level1Victory, setLevel1Victory] = useState(null);
  const [level2Victory, setLevel2Victory] = useState(null);

  useEffect(() => {
    loadItem("level1Victory", false, setLevel1Victory);
    loadItem("level2Victory", false, determineInitialRoute);
    
    function determineInitialRoute(level2Victory) {
      if (level1Victory == true) {
          setInitialRoute(level2Name);
          if (level2Victory == true) {
            setInitialRoute(level3Name);
          } else {
            setInitialRoute(level2Name);
          }
      } else {
        setInitialRoute(level1Name);
      }
    }
  }, []);

  return initialRoute != null ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={level1Victory ? level2Victory ? level2Name : level3Name : level1Name}
        screenOptions={{
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name={level1Name}
          component={GuessFlagScreen}
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
