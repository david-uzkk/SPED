import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { DrawerActions, useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Location from 'expo-location';
import VisitModal from "../components/VisitModal";
import { fetchSchools, getSchoolList } from "../data/Schools";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [visitModalVisible, setVisitModalVisible] = useState(false);
  const [legendModalVisible, setLegendModalVisible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [schoolsObject, setSchoolsObject] = useState({}); // Objeto para armazenar os objetos de escola

  const openMenu = () => {
    navigation.openDrawer(); 
  };

  const openPopup = () => {
    setLegendModalVisible(true);
  };

  const handleMarkerPress = (school) => {
    setSelectedSchool(school);
    setVisitModalVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => {
        fetchSchools().then(() => {
          const schools = getSchoolList();
          const schoolsObj = {};
          schools.forEach(school => {
              schoolsObj[school.id] = {
                  ...school,
                  latitude: parseFloat(school.longitude),
                  longitude: parseFloat(school.latitude)
              };
          });        
          setSchoolsObject(schoolsObj);
        });

        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permissão de acesso à localização negada');
            return;
          }

          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          });
        })();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, [])
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      default:
        return 'white';
    }
  };

  let text = 'Obtendo localização...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = 'Localização obtida';
  }

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Header
        backgroundColor="#0D214F"
        leftComponent={
          <Ionicons name="menu" size={24} color="white" onPress={openMenu} />
        }
        centerComponent={{
          text: "SPED",
          style: { color: "#fff", fontSize: 20 },
        }}
        rightComponent={
          <TouchableOpacity onPress={openPopup}>
            <Text style={styles.questionMark}>?</Text>
          </TouchableOpacity>
        }
      />

      {/* Mapa Interativo */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* Adicionando marcadores para cada escola */}
            {Object.values(schoolsObject).map((school) => (
              <Marker
                key={school.id}
                coordinate={{
                  latitude: parseFloat(school.longitude),
                  longitude: parseFloat(school.latitude),
                }}
                onPress={() => handleMarkerPress(school)}
                pinColor={getStatusColor(school.securityLevel)}
              />
            ))}
          </MapView>
        ) : (
          <Text>{text}</Text>
        )}
      </View>

      {/* Barra Inferior */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>GCM Caraguatatuba - SP</Text>
        <Text style={styles.footerText}>©CopyRights Valência</Text>
      </View>

      {/* Modal de Visita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visitModalVisible}
        onRequestClose={() => setVisitModalVisible(false)}
      >
        <VisitModal
          school={selectedSchool}
          closeModal={() => setVisitModalVisible(false)}
        />
      </Modal>

      {/* Popup com a legenda do mapa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={legendModalVisible}
        onRequestClose={() => setLegendModalVisible(false)}
      >
        <View style={styles.legendPopup}>
          <View style={styles.legendItem}>
            <View style={[styles.legendMarker, { backgroundColor: "green" }]} />
            <Text style={styles.legendText}>Escola com status verde</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendMarker, { backgroundColor: "yellow" }]} />
            <Text style={styles.legendText}>Escola com status amarelo</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendMarker, { backgroundColor: "orange" }]} />
            <Text style={styles.legendText}>Escola com status laranja</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[
              styles.legendMarker,
              { backgroundColor: "white", borderColor: "black", borderWidth: 1 },
            ]} />
            <Text style={styles.legendText}>Escola sem status definido</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setLegendModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  questionMark: {
    fontSize: 24,
    color: "white",
    marginRight: 10,
  },
  legendPopup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    marginTop: "auto",
    marginBottom: "auto",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#0D214F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
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
