// user_api.js
import api from "./api";

export const user_login = async data => {
    try {
        const result = await api.post("/auth/login", data);
        return result;
    } catch (error) {
        throw error; // Lança o erro para ser tratado na função de chamada
    }
};