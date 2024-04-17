import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const FormOccurrenceScreen = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Lógica para enviar o formulário de ocorrência
    console.log('Formulário de ocorrência enviado!');
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  // Dados de exemplo para as informações da ocorrência
  const gcmName = 'Nome do GCM';
  const schoolName = 'Nome da Escola';
  const occurrenceTime = 'Horário da Ocorrência';
  const occurrenceId = 'ID da Ocorrência';

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Header
        backgroundColor="#0D214F"
        leftComponent={<Icon name="menu" size={24} color="white" onPress={openMenu} />}
        centerComponent={{ text: 'SPEED', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={<Icon name="camera" size={24} color="white" />}
      />

      {/* Informações da Ocorrência */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>GCM:</Text>
          <Text style={styles.value}>{gcmName}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Escola:</Text>
          <Text style={styles.value}>{schoolName}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.value}>{occurrenceTime}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>ID da Ocorrência:</Text>
          <Text style={styles.value}>{occurrenceId}</Text>
        </View>
      </View>

      {/* Formulário de Ocorrência */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Descreva a ocorrência..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 150,
  },
  submitButton: {
    backgroundColor: '#0D214F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default FormOccurrenceScreen;
