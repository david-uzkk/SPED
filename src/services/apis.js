// apis.js
import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

let intervalId = null;

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
            const userData = response.data; 

            return userData;
        } else {
            throw new Error('Token not found');
        }
    } catch (error) {
        throw error;
    }
};

export const submitVisit = async ({ visitDate, visitPeriod }) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) {
        throw new Error('Token não encontrado');
      }
  
      const response = await api.post('/home/visit', {
        visitDate,
        visitPeriod,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar a visita:', error);
      throw error;
    }
  };