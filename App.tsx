import React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import SplashScreen from './src/screens/Splash';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';

const Stack = createNativeStackNavigator()

const LightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'white'
	}
}

function App() {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator>

        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        <Stack.Screen name="Splash" component={SplashScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
