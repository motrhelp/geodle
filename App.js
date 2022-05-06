import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GuessCapitalScreen from './screens/GuessCapitalScreen';
import GuessFlagScreen from './screens/GuessFlagScreen';

import leftArrow from './img/left-arrow.png'

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='GuessFlagScreen'
        screenOptions={{
          // headerShown: false
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name="GuessFlagScreen"
          component={GuessFlagScreen}
        />
        <Stack.Screen
          name="GuessCapitalScreen"
          component={GuessCapitalScreen}
          options={{
            title: 'GEODLE\n Level 2',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackImageSource: leftArrow
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
