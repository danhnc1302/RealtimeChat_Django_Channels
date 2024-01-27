import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import SplashScreen from './src/screens/Splash';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import MessagesScreen from './src/screens/Messages';

import useGlobal from './src/core/global';

const Stack = createNativeStackNavigator()

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

function App() {

  const initialized = useGlobal(state => state.initialized)
  const authenticated = useGlobal(state => state.authenticated)
  const init = useGlobal(state => state.init)

  useEffect(() => {
    init()
  }, [])

  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator>
        {
          !initialized ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : !authenticated ? (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="Messages" component={MessagesScreen} />
            </>
          )
        }



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
