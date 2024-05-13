// SchoolsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import HorarioModal from '../components/VisitModal';
import { getSchoolList, fetchSchools } from '../data/Schools'; // Importar a função getSchoolList

const SchoolsScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [escolas, setEscolas] = useState([]); // Usar estado para armazenar as escolas

  // Carregar as escolas ao iniciar a tela
  useEffect(() => {
    const loadSchools = async () => {
      await fetchSchools(); // Buscar as escolas
      setEscolas(getSchoolList()); // Atualizar o estado com a lista de escolas
    };
    loadSchools();
  }, []);

  // Renderizar cada item da lista de escolas
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.escolaItem} onPress={() => setModalVisible(true)}>
      <Text style={styles.escolaNome}>{item.name}</Text>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.securityLevel) }]} />
    </TouchableOpacity>
  );

  // Obter a cor do status com base na marcação
  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return '#00FF00';
      case 1:
        return '#FFFF00';
      case 2:
        return '#FF6400';
      case 3:
        return '#000000';
      default:
        return '#000000';
    }
  };  

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Header
        backgroundColor="#0D214F"
        leftComponent={<Icon name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} />}
        centerComponent={{ text: 'SPED', style: { color: '#fff', fontSize: 20 } }}
      />

      {/* Lista de Escolas */}
      <FlatList
        data={escolas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listaEscolas}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <HorarioModal closeModal={() => setModalVisible(false)} />
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
    backgroundColor: '#fff',
  },
  escolaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  escolaNome: {
    flex: 1,
    fontSize: 16,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  listaEscolas: {
    flex: 1,
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

export default SchoolsScreen;
