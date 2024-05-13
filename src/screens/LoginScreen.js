import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import { useNavigation } from "@react-navigation/native";
import { user_login } from "../services/user_api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Verifica se o CPF e a senha não estão vazios
    if (!username.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha CPF e senha.");
      return;
    }

    try {
      const result = await user_login({
        cpf: username,
        pass: password,
        role: "admin"
      });

      // Se a resposta foi bem-sucedida (status 200)
      if (result.status === 200) {
        // Salva o token de acesso no AsyncStorage
        await AsyncStorage.setItem('AccessToken', result.data.token);
        // Navega para a tela Home
        navigation.replace("Home");
      } else {
        // Se a resposta não foi bem-sucedida, exibe uma mensagem de erro
        Alert.alert("Erro", result.data.message || "Erro desconhecido durante o login.");
      }
    } catch (error) {
      // Se ocorrer um erro, exibe uma mensagem de erro genérica
      if (error.response && error.response.data) {
        Alert.alert("Erro", error.response.data.message || "Erro desconhecido durante o login.");
      } else {
        Alert.alert("Erro", "Erro desconhecido durante o login.");
      }
      console.error("Erro durante o login:", error);
    }
  };  

  const handleHelpPress = () => {
    Alert.alert(
      "Precisa de ajuda?",
      "Entre em contato para mais informações\n(12) 3333-3333\nContato@gmail.com",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>SPED</Text>
        <Text style={styles.subtitle}>
          Sistema de Patrulha Escolar Digital
        </Text>
      </View>
      <View style={styles.loginBox}>
        <Input
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="CPF"
          keyboardType="numeric"
        />
        <PasswordInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Senha"
        />
        <Button onPress={handleLogin} title="Entrar" />
        <Text style={styles.helpText} onPress={handleHelpPress}>
          Precisa de ajuda?
        </Text>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0D214F",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
  },
  loginBox: {
    backgroundColor: "#192C58",
    padding: 20,
    marginTop: -6,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  helpText: {
    marginTop: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#fff",
  },
});

export default LoginScreen;
