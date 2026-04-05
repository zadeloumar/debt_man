// screens/auth/SellerLoginScreen.jsx
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function SellerLoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    setLoading(true);
    const result = await login(phone, password);
    setLoading(false);
    if (result.success) {
      navigation.replace('SellerDashboard');
    } else {
      Alert.alert('Ошибка', result.error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Вход продавца" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={{ padding: spacing.lg }}>
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Телефон</Text>
        <TextInput
          style={{
            backgroundColor: colors.navyBlue,
            color: colors.cream,
            padding: spacing.md,
            borderRadius: 12,
            marginBottom: spacing.md,
            borderWidth: 1,
            borderColor: colors.lightBlue,
          }}
          placeholder="900000001"
          placeholderTextColor={colors.gray}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Пароль</Text>
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
          placeholder="******"
          placeholderTextColor={colors.gray}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title={loading ? <ActivityIndicator color="#fff" /> : 'Войти'}
          onPress={handleLogin}
          disabled={loading}
        />
      </View>
    </View>
  );
}