// screens/auth/ClientPhoneScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getCustomerDebts } from '../../api/customers';

export default function ClientPhoneScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить долги. Проверьте номер.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Проверка долгов" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={{ padding: spacing.lg }}>
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Ваш телефон</Text>
        <TextInput
          style={{
            backgroundColor: colors.navyBlue,
            color: colors.cream,
            padding: spacing.md,
            borderRadius: 12,
            marginBottom: spacing.lg,
            borderWidth: 1,
            borderColor: colors.lightBlue,
          }}
          placeholder="900000123"
          placeholderTextColor={colors.gray}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Button title={loading ? 'Загрузка...' : 'Показать долги'} onPress={handleCheck} disabled={loading} />
      </View>
    </View>
  );
}