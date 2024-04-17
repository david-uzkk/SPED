import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Escolas from '../data/Escolas';
import VisitModal from '../components/VisitModal';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleMarkerPress = (school) => {
    setSelectedSchool(school);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Header
        backgroundColor="#0D214F"
        leftComponent={<Ionicons name="menu" size={24} color="white" onPress={openMenu} />}
        centerComponent={{ text: 'SPED', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={<Ionicons name="person-circle-outline" size={24} color="white" onPress={goToProfile} />}
      />

      {/* Mapa Interativo */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -23.625203058058755,
            longitude: -45.42235136074362,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >
          {/* Adicionando marcadores para cada escola */}
          {Escolas.map((school, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: school.latitude, longitude: school.longitude }}
              onPress={() => handleMarkerPress(school)}
              pinColor={school.status === 'verde' ? 'green' : school.status === 'laranja' ? 'orange' : 'red'}
            />
          ))}
        </MapView>
      </View>

      {/* Modal de Visita */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <VisitModal school={selectedSchool} closeModal={() => setModalVisible(false)} />
      </Modal>

      {/* Barra Inferior */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>GCM Caraguatatuba - SP</Text>
        <Text style={styles.footerText}>©CopyRights Valência</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#0D214F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default HomeScreen;
