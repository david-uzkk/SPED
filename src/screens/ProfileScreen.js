import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../services/apis'; // Importar a função getUserData
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    nome: '',
    cpf: '',
    cidade: '',
    telefone: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedCpf = await AsyncStorage.getItem('UserCPF');
        if (!savedCpf) {
          throw new Error('CPF not found');
        }

        const usersData = await getUserData();
        const user = usersData.find(user => user.cpf === savedCpf);

        if (user) {
          setUserData({
            nome: String(user.name || ''),
            cpf: String(user.cpf || ''),
            cidade: String(user.city || ''),
            telefone: String(user.phone || '')
          });
          
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.log('Erro ao obter dados do usuário:', error.message);
      }
    };

    fetchUserData(); 

    const intervalId = setInterval(fetchUserData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSave = () => {
    console.log(userData);
    console.log('Informações do perfil salvas!');
  };

  const openMenu = () => {
    navigation.openDrawer(); 
  };

  const getInputStyle = (editable) => {
    return editable ? styles.input : [styles.input, styles.inputDisabled];
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Header
        backgroundColor="#0D214F"
        leftComponent={<Icon name="menu" size={24} color="white" onPress={openMenu} />} 
        centerComponent={{ text: 'Perfil', style: { color: '#fff', fontSize: 20 } }}
      />

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={styles.profileIconContainer}>
          <Ionicons name="person-circle-outline" size={200} color="#0D214F" />
        </View>
        <View style={styles.inputContainer}>
          {/* Preencher os TextInput com os dados do usuário */}
          <TextInput style={getInputStyle(false)} placeholder="Nome" value={userData.nome} editable={false} />
          <TextInput style={getInputStyle(false)} placeholder="CPF" value={userData.cpf} editable={false} />
          <TextInput style={getInputStyle(true)} placeholder="Cidade" value={userData.cidade} editable={true} />
          <TextInput style={getInputStyle(true)} placeholder="Telefone" value={userData.telefone} editable={true} />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
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
    backgroundColor: '#0D214F',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileIconContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    color: 'black',
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#e0e0e0', 
  },
  saveButton: {
    backgroundColor: '#0D214F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
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

export default ProfileScreen;
