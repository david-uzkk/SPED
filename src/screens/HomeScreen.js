// HomeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import Escolas from "../data/Escolas";
import VisitModal from "../components/VisitModal";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [visitModalVisible, setVisitModalVisible] = useState(false);
  const [legendModalVisible, setLegendModalVisible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const openPopup = () => {
    setLegendModalVisible(true);
  };

  const handleMarkerPress = (school) => {
    setSelectedSchool(school);
    setVisitModalVisible(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
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
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      })();
    }, 1000);

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado

  }, []); // O segundo argumento vazio garante que o useEffect seja executado apenas uma vez, após a montagem do componente

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
          >
            {/* Adicionando marcadores para cada escola */}
            {Escolas.map((school) => (
              <Marker
                key={school.id} // Use um identificador único, como o ID da escola
                coordinate={{
                  latitude: school.latitude,
                  longitude: school.longitude,
                }}
                onPress={() => handleMarkerPress(school)}
                pinColor={
                  school.status === "verde" ? "green" :
                  school.status === "amarelo" ? "yellow" :
                  school.status === "laranja" ? "orange" : "white"
                }
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
            <View
              style={[styles.legendMarker, { backgroundColor: "yellow" }]}
            />
            <Text style={styles.legendText}>Escola com status amarelo</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendMarker, { backgroundColor: "orange" }]}
            />
            <Text style={styles.legendText}>Escola com status laranja</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendMarker,
                {
                  backgroundColor: "white",
                  borderColor: "black",
                  borderWidth: 1,
                },
              ]}
            />
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
