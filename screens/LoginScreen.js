import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // logica para autenticar o usuário
    if (username === "123" && password === "123") {
      navigation.navigate("Home");
    } else {
      Alert.alert("Credenciais inválidas");
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
        <Text style={styles.subtitle}>Sistema de Patrulha Escolar Digital</Text>
      </View>
      <View style={styles.loginBox}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            const formattedText = text.replace(/[^0-9]/g, "");
            setUsername(formattedText);
          }}
          value={username}
          placeholder="CPF"
          keyboardType="numeric" 
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Senha"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
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
  input: {
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: "#0D214F",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
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
