import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Функция для получения сохранённого адреса сервера
const getServerUrl = async () => {
  let url = await AsyncStorage.getItem('serverUrl');
  
  if (!url) {
    // Значение по умолчанию – можно задать любой, но лучше показать экран настройки
    url = 'http://192.168.43.889:5000 ';
  }
  console.log("client.js url>"+url)
  return url;
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