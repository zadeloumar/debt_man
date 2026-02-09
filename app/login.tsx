import { View, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { login } from "./src/services/authService";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(id, password);
    router.replace("/admin/dashboard");
  };

  return (
    <View>
      <TextInput placeholder="ID" onChangeText={setId} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword}/>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
