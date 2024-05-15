// api.js
import axios from 'axios';

const api = axios.create({
  // Duas opçoes de base url para usar, uma para o emulador e outra para o celular real.
  // baseURL: 'http://10.0.2.2:8080',
  baseURL: 'http://192.168.100.64:8080',
  responseType: 'json',
  withCredentials: true,
});

export default api;