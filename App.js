import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image } from 'react-native';

import GuessCapital from './screens/GuessCapital';
import GuessFlag from './screens/GuessFlag';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='GuessFlag'
        screenOptions={{
          // headerShown: false
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name="GuessFlag"
          component={GuessFlag}
          options={{
            title: 'GEODLE\n Level 1',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="GuessCapital"
          component={GuessCapital}
          options={{
            title: 'GEODLE\n Level 2',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
