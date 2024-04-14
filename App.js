// App.js
import React from 'react';
import { useFonts } from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
console.disableYellowBox = true;

const App = () => {
  const [fontsLoaded, error] = useFonts({
    'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return <AppNavigator />;
};

export default App;
