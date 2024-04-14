// PasswordInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const PasswordInput = ({ value, onChangeText, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  toggleButton: {
    padding: 8,
  },
});

export default PasswordInput;
