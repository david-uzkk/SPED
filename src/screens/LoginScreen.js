// LoginScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api"; // Importando o serviço Axios

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "123" && password === "123") {
      // Permitindo login com o CPF "123" e senha "123"
      console.log("Login bem-sucedido como usuário padrão");
      navigation.replace("Home");
    } else {
      // Fazendo a solicitação POST para o endpoint de login usando o serviço Axios
      api
        .post("/auth/login", {
          cpf: username,
          pass: password,
        })
        .then((response) => {
          // Se a solicitação for bem-sucedida, você pode redirecionar o usuário para a próxima tela ou executar outras ações necessárias
          console.log("Login bem-sucedido:", response.data);
          navigation.replace("Home"); // Redireciona para a tela Home após o login
        })
        .catch((error) => {
          // Se ocorrer algum erro durante a solicitação, você pode exibir uma mensagem de erro ao usuário
          console.error("Erro ao fazer login:", error);
          Alert.alert("Erro", "Credenciais inválidas");
        });
    }
  };

  /* const handleLogin = () => {
    api
      .post("/auth/login", {
        cpf: username,
        pass: password,
      })
      .then((response) => {
        // Se a solicitação for bem-sucedida, você pode redirecionar o usuário para a próxima tela ou executar outras ações necessárias
        console.log("Login bem-sucedido:", response.data);
        navigation.replace("Home"); // Redireciona para a tela Home após o login
      })
      .catch((error) => {
        // Se ocorrer algum erro durante a solicitação, você pode exibir uma mensagem de erro ao usuário
        console.error("Erro ao fazer login:", error);
        Alert.alert("Erro", "Credenciais inválidas");
      });
  }; */

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