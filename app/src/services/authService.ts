import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

export const login = async (id: string, password: string) => {
  const res = await api.post("/login", {id, password,});

  await AsyncStorage.setItem("token", res.data.token);
  await AsyncStorage.setItem("expiresAt", res.data.expiresAt);

  return res.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("expiresAt");
};

export const checkToken = async () => {
  const expiresAt = await AsyncStorage.getItem("expiresAt");

  if (!expiresAt) return false;

  return new Date(expiresAt) > new Date();
};

