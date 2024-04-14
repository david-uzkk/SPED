// Input.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ value, onChangeText, placeholder, keyboardType }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={keyboardType === "password"}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default Input;
