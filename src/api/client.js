import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

const fallbackServerUrl =
  Constants.expoConfig?.extra?.apiUrl?.trim?.() || 'http://185.73.126.166:5000';

// Функция для получения сохранённого адреса сервера
const getServerUrl = async () => {
  let url = await AsyncStorage.getItem('serverUrl');

  if (!url) {
    url = fallbackServerUrl;
  }
  return url.trim();
};

// Создаём экземпляр без baseURL, будем устанавливать динамически
const api = axios.create({
  timeout: 10000,
});

// Интерцептор запросов – устанавливаем актуальный baseURL перед каждым запросом
api.interceptors.request.use(async (config) => {
  const baseURL = await getServerUrl();
  config.baseURL = baseURL;

  const token = await AsyncStorage.getItem('sellerToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
