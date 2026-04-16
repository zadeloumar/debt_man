import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSeller } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sellerToken, setSellerToken] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'seller', 'admin', 'factory'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const token = await AsyncStorage.getItem('sellerToken');
    const role = await AsyncStorage.getItem('userRole');
    setSellerToken(token);
    setUserRole(role || (token ? 'seller' : null));
    setIsLoading(false);
  };

  const login = async (phone, password) => {
    try {
      const response = await loginSeller(phone, password);
      const { token, user } = response.data;
      const resolvedRole = user?.role || 'seller';
      await AsyncStorage.setItem('sellerToken', token);
      await AsyncStorage.setItem('userRole', resolvedRole);
      setSellerToken(token);
      setUserRole(resolvedRole);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Ошибка входа' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('sellerToken');
    await AsyncStorage.removeItem('userRole');
    setSellerToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ sellerToken, userRole, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
