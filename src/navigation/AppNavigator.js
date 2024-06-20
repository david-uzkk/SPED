import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OccurrenceScreen from '../screens/OccurrenceScreen';
import FormOccurrenceScreen from '../screens/FormOccurrenceScreen';
import EscolasScreen from '../screens/SchoolsScreen';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Formulario" component={FormOccurrenceScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const handleLogout = async (navigation) => {
  await AsyncStorage.clear();
  navigation.navigate('Login', { screen: 'Login' });
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }]
  });
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuHeaderText}>Menu</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.logoutButtonContainer}>
        <DrawerItem
          label="Sair"
          onPress={() => handleLogout(props.navigation)}
          labelStyle={styles.logoutButtonLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Mapa" component={MainStackNavigator} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
        <Drawer.Screen name="Ocorrência" component={OccurrenceScreen} />
        <Drawer.Screen name="Escolas" component={EscolasScreen} />
        <Drawer.Screen 
          name="Formulario" 
          component={FormOccurrenceScreen} 
          options={{ drawerItemStyle: { height: 0 } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  menuHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: -10,
    marginBottom: 16,
  },
  logoutButtonLabel: {
    color: 'red',
  },
});

export default AppNavigator;