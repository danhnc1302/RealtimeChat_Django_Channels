import React from 'react';
import SplashScreen from './src/screens/Splash';
import { Text, View } from 'react-native';

function App(): React.JSX.Element {
  return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text>
          Nguyen Cong Danh
        </Text>
      </View>
  );
}

export default App;
