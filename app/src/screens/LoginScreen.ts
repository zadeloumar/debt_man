import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContex';

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
