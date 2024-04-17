// EscolaScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import HorarioModal from '../components/VisitModal';

const EscolaScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); 

  // Dados de exemplo para a lista de escolas
  const escolas = [
    { id: 1, nome: 'Escola A', status: 'verde' },
    { id: 2, nome: 'Escola B', status: 'laranja' },
    { id: 3, nome: 'Escola C', status: 'vermelho' },
    // Adicione mais escolas conforme necessário
  ];

  // Renderizar cada item da lista de escolas
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.escolaItem} onPress={() => setModalVisible(true)}>
      <Text style={styles.escolaNome}>{item.nome}</Text>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
    </TouchableOpacity>
  );

  // Obter a cor do status com base na marcação
  const getStatusColor = (status) => {
    switch (status) {
      case 'verde':
        return '#00FF00';
      case 'laranja':
        return '#FFA500';
      case 'vermelho':
        return '#FF0000';
      default:
        return '#000';
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

export default EscolaScreen;