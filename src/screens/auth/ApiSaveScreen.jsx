// screens/auth/ApiSaveScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getCustomerDebts } from '../../api/customers';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ApiSave() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const [API_URL, setAPI_URL] = useState('');

  const handleCheck = async () => {
    if (!phone) {
      Alert.alert('Ошибка', 'Введите номер телефона');
      return;
    }
    setLoading(true);
    try {
      const response = await getCustomerDebts(phone);
      // Если успешно, переходим на экран с долгами, передавая данные
      navigation.navigate('MyDebts', { debts: response.data, phone });
    } catch (_error) {
      Alert.alert('Ошибка', 'Не удалось загрузить долги. Проверьте номер.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Подклчения к серверу" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="http://192.168.43.88:5000"
            placeholderTextColor={colors.gray}
            value={API_URL}
            onChangeText={setPhone}
          />
          <Button title={loading ? 'Загрузка...' : 'подключения к серверу'} onPress={handleCheck} disabled={loading} />
        </View>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Проверьте задолженность за пару секунд</Text>
          <Text style={styles.heroText}>
            Введите номер телефона, и мы покажем все связанные долги по магазинам.
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
    justifyContent: 'flex-start',
  },
  heroCard: {
    backgroundColor: colors.navyBlue,
    borderRadius: 24,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
  heroTitle: {
    color: colors.cream,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  heroText: {
    color: colors.gray,
    fontSize: 15,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: '#08213E',
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.35)',
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
});
