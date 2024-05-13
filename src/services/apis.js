// apis.js
import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

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