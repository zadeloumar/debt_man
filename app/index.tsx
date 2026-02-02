import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState, useContext } from 'react';
import { AuthContext } from './src/context/AuthContext';

export default function LoginScreen() {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, loading } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>ID пользователя</Text>
      <TextInput
        value={userId}
        onChangeText={setUserId}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />

      <Text>Пароль</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />

      <TouchableOpacity
        onPress={() => login(userId, password)}
        disabled={loading}
        style={{ backgroundColor: '#03346E', padding: 15 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          {loading ? 'Вход...' : 'Войти'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// const Logscreen = () => {
//   return (<View style={styles.container}>
//       <Text style={styles.hed1}>Вход</Text>
//       <TextInput id="id_log" placeholder="Enter your id" style={styles.input} />
//       <TextInput id="id_pass" placeholder="Enter password" style={styles.input} />
//       <Button title="Login" onPress={() => router.push("./src/screens/admin/AdminMenu")} /> 
//     </View>);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e2e2e",
  },
  hed1: {
    color: "#ffffff",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#4e4e4e",
    borderColor: "#ffffff",
    borderWidth: 1,
    color: "#ffffff",
    width: "80%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});