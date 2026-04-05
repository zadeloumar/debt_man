import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSeller } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sellerToken, setSellerToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const token = await AsyncStorage.getItem('sellerToken');
    setSellerToken(token);
    setIsLoading(false);
  };

  const login = async (phone, password) => {
    try {
      const response = await loginSeller(phone, password);
      const { token } = response.data;
      await AsyncStorage.setItem('sellerToken', token);
      setSellerToken(token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Ошибка входа' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('sellerToken');
    setSellerToken(null);
  };

  return (
    <AuthContext.Provider value={{ sellerToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};