// screens/seller/AddDebtScreen.jsx
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addDebt } from '../../api/debts';
import { Button } from '../../components/common/Button';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';


export default function AddDebtScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState('');

  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  const handleAdd = async () => {
    let finDate = dueDate;

    if (!finDate) {
      finDate = formattedDate;
    }

    if (!name || !phone || !amount ) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    setLoading(true);
    try {
      await addDebt({
        name,
        phone,
        amount: parseFloat(amount),
        due_date: finDate, 
        description
      });
      Alert.alert('Успех', 'Долг добавлен');
      navigation.goBack();
    } catch (_error) {
      Alert.alert('Ошибка', 'Не удалось добавить долг');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
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
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Описание (за что долг)</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={colors.gray}
          placeholder="Например: продукты, бензин..."
        />
        <Text style={{ color: colors.cream, marginBottom: spacing.xs }}>Срок (ГГГГ-ММ-ДД)</Text>
        <TextInput
          style={styles.input}
          placeholder={formattedDate}
          placeholderTextColor={colors.gray}
          value={dueDate}
          onChangeText={setDueDate}
        />
        
        <Button title={loading ? <ActivityIndicator color="#fff" /> : 'Добавить'} onPress={handleAdd} disabled={loading} />
      </View>
    </SafeAreaView>
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
