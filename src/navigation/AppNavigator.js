import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OccurrenceScreen from '../screens/OccurrenceScreen';
import FormOccurrenceScreen from '../screens/FormOccurrenceScreen';
import EscolasScreen from '../screens/EscolasScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const LineSeparator = () => (
  <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 10 }} />
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Mapa" component={MainStackNavigator} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} /> 
        <Drawer.Screen name="Ocorrência" component={OccurrenceScreen} />
        <Drawer.Screen name="Escolas" component={EscolasScreen} /> 
        <Drawer.Screen name="Formulário" component={FormOccurrenceScreen} />   
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
