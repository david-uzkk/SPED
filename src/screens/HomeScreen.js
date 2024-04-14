// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { DrawerActions, useNavigation } from '@react-navigation/native'; 


const HomeScreen = () => {
  const navigation = useNavigation(); 

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Barra Superior */}
      <Header
        backgroundColor="#0D214F"
        leftComponent={<Ionicons name="menu" size={24} color="white" onPress={openMenu} />}
        centerComponent={{ text: 'SPED', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={<Ionicons name="person-circle-outline" size={24} color="white" onPress={goToProfile} />}
      />

      {/* Mapa Interativo */}
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -23.6173991,
            longitude: -45.4041793,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        />
      </View>

      {/* Barra Inferior */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>GCM Caraguatatuba - SP</Text>
        <Text style={styles.footerText}>©CopyRights Valência</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0D214F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default HomeScreen;