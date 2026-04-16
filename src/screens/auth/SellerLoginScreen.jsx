import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../components/common/Button';
import { Header } from '../../components/common/Header';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SellerLoginScreen({ navigation, route }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const screenTitle = route?.params?.screenTitle || 'Вход продавца';
  const screenSubtitle =
    route?.params?.screenSubtitle || 'Введите телефон и пароль, чтобы открыть рабочий кабинет.';

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    setLoading(true);
    const result = await login(phone, password);
    setLoading(false);
    if (!result.success) {
      Alert.alert('Ошибка', result.error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title={screenTitle} showBackButton onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.formCard}>
          <Text style={styles.label}>Телефон</Text>
          <TextInput
            style={styles.input}
            placeholder="900000001"
            placeholderTextColor={colors.gray}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            placeholderTextColor={colors.gray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title={loading ? <ActivityIndicator color={colors.darkBlue} /> : 'Войти'}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>{screenTitle}</Text>
          <Text style={styles.heroText}>{screenSubtitle}</Text>
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
    fontSize: 28,
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
  label: {
    color: colors.cream,
    marginBottom: spacing.xs,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.navyBlue,
    color: colors.cream,
    padding: spacing.md,
    borderRadius: 14,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
});
