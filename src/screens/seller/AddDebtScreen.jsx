// screens/seller/AddDebtScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { addDebt } from '../../api/debts';

export default function AddDebtScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name || !phone || !amount || !dueDate) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    setLoading(true);
    try {
      await addDebt({
        name,
        phone,
        amount: parseFloat(amount),
        due_date: dueDate,
      });
      Alert.alert('Успех', 'Долг добавлен');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось добавить долг');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Новый долг" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={{ padding: spacing.lg }}>
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Имя клиента</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Телефон</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Сумма (₽)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Срок (ГГГГ-ММ-ДД)</Text>
        <TextInput
          style={styles.input}
          placeholder="2026-04-01"
          placeholderTextColor={colors.gray}
          value={dueDate}
          onChangeText={setDueDate}
        />
        <Button title={loading ? <ActivityIndicator color="#fff" /> : 'Добавить'} onPress={handleAdd} disabled={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.navyBlue,
    color: colors.cream,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
});