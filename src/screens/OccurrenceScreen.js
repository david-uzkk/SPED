import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const OccurrenceScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const handleVerifyCode = () => {
    const correctCode = 'ABC123'; 
    if (code.toUpperCase() === correctCode) {
      navigation.navigate('Formulario');
    } else {
      Alert.alert('Código Incorreto', 'Por favor, tente novamente.');
    }
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Header
        backgroundColor="#0D214F"
        leftComponent={<Icon name="menu" size={24} color="white" onPress={openMenu} />}
        centerComponent={{ text: 'Ocorrência', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={<Icon name="camera" size={24} color="white" />}
      />

      {/* Input para o Código */}
      <View style={styles.codeContainer}>
        <TextInput
          style={styles.codeInput}
          placeholder="Digite o código"
          placeholderTextColor="#ccc"
          value={code}
          onChangeText={(text) => setCode(text.toUpperCase())}
          maxLength={6}
          autoCapitalize="characters"
        />
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
          <Text style={styles.verifyButtonText}>Verificar Código</Text>
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
  codeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  codeInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#0D214F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default OccurrenceScreen;