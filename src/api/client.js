import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.43.88:5000'; // замени на свой IP:port

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Добавляем токен к каждому запросу, если он есть
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('sellerToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;