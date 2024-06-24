import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { submitVisit } from '../services/apis';  // Importando a nova função da API

const VisitModelScreen = ({ closeModal }) => {
  const handleSelect = async (period) => {
    try {
      const cpf = await AsyncStorage.getItem('UserCPF');
      if (!cpf) throw new Error('CPF não encontrado');
      
      const visitDate = new Date();
      const visitPeriod = period;
      
      await submitVisit({ visitDate, visitPeriod });

      console.log(`CPF: ${cpf}`);
      console.log(`${period} selecionada`);
      closeModal();
    } catch (error) {
      console.error('Erro ao registrar a visita:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Selecione o horário:</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleSelect('morning')}>
              <Text style={styles.buttonText}>Manhã</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSelect('afternoon')}>
              <Text style={styles.buttonText}>Tarde</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleSelect('night')}>
              <Text style={styles.buttonText}>Noite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={closeModal}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0D214F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VisitModelScreen;
