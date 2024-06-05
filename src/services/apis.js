// apis.js
import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

let intervalId = null; // Variável para armazenar o ID do intervalo

export const user_login = async data => {
    try {
        const result = await api.post("/auth/login", data);
        return result;
    } catch (error) {
        throw error; 
    }
};

export const getSchools = async () => {
    try {
        const token = await AsyncStorage.getItem('AccessToken');
        if (token) {
            const response = await api.get("/home", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } else {
            throw new Error('Token not found');
        }
    } catch (error) {
        throw error; 
    }
};

export const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('AccessToken');
        if (token) {
            const response = await api.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userData = response.data; // Armazenar os dados do usuário
            
            // Exibir os dados do usuário no console como um objeto
            console.log("Dados do usuário:", userData);
            
            // Definir um intervalo para exibir o console log a cada 5 segundos
            if (!intervalId) {
                intervalId = setInterval(() => {
                    console.log("Dados do usuário (a cada 5 segundos):", userData);
                }, 5000);
            }

            return userData; // Retornar os dados do usuário
        } else {
            throw new Error('Token not found');
        }
    } catch (error) {
        throw error;
    }
};
