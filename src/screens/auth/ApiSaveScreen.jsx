import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function ApiSaveScreen({ navigation }) {
  const [serverUrl, setServerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // 'success', 'error', null

  // Функция проверки подключения к серверу
  const testConnection = async (url) => {
  try {
    const response = await axios.get(`${url}/admin/stats`, {
      timeout: 5000,
      validateStatus: (status) => status < 500, // считаем успехом любые статусы кроме 5xx
    });
    // Если статус 200, 401, 403, 404 – сервер доступен
    if (response.status === 200 || response.status === 401 || response.status === 403) {
      console.log(`Сервер ответил со статусом ${response.status}`);
      return true;
    }
    console.log(`Неожиданный статус: ${response.status}`);
    return false;
  } catch (error) {
    // Сюда попадём только при сетевых ошибках или таймауте
    console.log("Сетевая ошибка или сервер не отвечает:", error.message);
    return false;
  }
};

  const handleSaveAndTest = async () => {
    if (!serverUrl.trim()) {
      Alert.alert('Ошибка', 'Введите адрес сервера, например http://192.168.1.100:5000');
      return;
    }

    // Убираем лишний слеш в конце
    let cleanUrl = serverUrl.trim().replace(/\/$/, '');
    setLoading(true);
    setTestStatus(null);

    const isReachable = await testConnection(cleanUrl);
    if (isReachable) {
      // Сохраняем адрес в AsyncStorage
      await AsyncStorage.setItem('serverUrl', cleanUrl);
      setTestStatus('success');
      Alert.alert(
        'Успех',
        'Подключение к серверу установлено. Адрес сохранён. Перезапустите приложение для применения настроек.',
        [{ text: 'OK', onPress: () => navigation.replace('RoleSelect') }]
      );
    } else {
      setTestStatus('error');
      Alert.alert('Ошибка', 'Не удалось подключиться к серверу. Проверьте адрес, доступность сети и что сервер запущен.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Настройка сервера" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.formCard}>
          <Text style={styles.label}>Адрес сервера (с портом)</Text>
          <TextInput
            style={styles.input}
            placeholder="http://192.168.43.88:5000"
            placeholderTextColor={colors.gray}
            value={serverUrl}
            onChangeText={setServerUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button
            title={loading ? <ActivityIndicator color="#fff" /> : 'Проверить и сохранить'}
            onPress={handleSaveAndTest}
            disabled={loading}
          />
          {testStatus === 'success' && (
            <Text style={styles.successText}>✓ Сервер доступен, настройки сохранены</Text>
          )}
          {testStatus === 'error' && (
            <Text style={styles.errorText}>✗ Сервер не отвечает, проверьте адрес и сеть</Text>
          )}
        </View>

        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>📘 Инструкция</Text>
          <Text style={styles.instructionText}>
            1. Узнайте IP-адрес компьютера, на котором запущен сервер (в локальной сети).{'\n'}
            2. Убедитесь, что сервер запущен (команда `npm run dev` в папке `backend`).{'\n'}
            3. Введите адрес в формате: `http://IP_адрес:5000` (например, http://192.168.1.100:5000).{'\n'}
            4. Нажмите «Проверить и сохранить».{'\n'}
            5. После успешной проверки приложение перезагрузит навигацию. Все последующие запросы пойдут на указанный сервер.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  formCard: {
    backgroundColor: '#08213E',
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.35)',
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.cream,
    fontSize: 16,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.navyBlue,
    color: colors.cream,
    padding: spacing.md,
    borderRadius: 14,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
  successText: {
    color: colors.success,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  instructionCard: {
    backgroundColor: colors.navyBlue,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
  instructionTitle: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  instructionText: {
    color: colors.gray,
    fontSize: 14,
    lineHeight: 20,
  },
});