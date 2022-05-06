import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GuessCapitalScreen from './screens/GuessCapitalScreen';
import GuessFlagScreen from './screens/GuessFlagScreen';

import { loadItem } from './util/DataStorage';
import { level1Name, level2Name } from './screens/Navigation';

const Stack = createNativeStackNavigator();

export default function App() {

  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    function determineInitialRoute(level1Victory) {
      if (level1Victory == true) {
        setInitialRoute(level2Name);
      } else {
        setInitialRoute(level1Name);
      }
    }
    loadItem("level1Victory", false, determineInitialRoute)
  }, []);

  return initialRoute != null ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
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
          options={{
            title: 'GEODLE\n Level 2',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackButtonMenuEnabled: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
    : null
}
