import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GuessCapital from './screens/GuessCapital';
import GuessFlag from './screens/GuessFlag';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='GuessFlag'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="GuessFlag"
          component={GuessFlag}
        />
        <Stack.Screen
          name="GuessCapital"
          component={GuessCapital} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
