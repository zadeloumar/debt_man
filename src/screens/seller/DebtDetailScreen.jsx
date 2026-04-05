// screens/seller/DebtDetailScreen.jsx
import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { payDebt } from '../../api/debts';

export default function DebtDetailScreen({ route, navigation }) {
  const { debt } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    Alert.alert(
      'Подтверждение',
      'Отметить долг как оплаченный?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Да',
          onPress: async () => {
            setLoading(true);
            try {
              await payDebt(debt.id);
              Alert.alert('Успех', 'Долг погашен');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Ошибка', 'Не удалось обновить статус');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Детали долга" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={{ padding: spacing.lg }}>
        <View style={{ backgroundColor: colors.navyBlue, borderRadius: 12, padding: spacing.md, marginBottom: spacing.md }}>
          <Text style={{ color: colors.cream, fontSize: 18 }}>{debt.name}</Text>
          <Text style={{ color: colors.lightBlue, marginTop: spacing.xs }}>📞 {debt.phone}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md }}>
            <Text style={{ color: colors.cream }}>Сумма:</Text>
            <Text style={{ color: colors.error, fontSize: 20, fontWeight: 'bold' }}>{debt.amount} ₽</Text>
          </View>
          <Text style={{ color: colors.gray, marginTop: spacing.xs }}>Срок: {debt.due_date}</Text>
          <Text style={{ color: colors.gray }}>Статус: {debt.status === 'active' ? 'Активен' : 'Оплачен'}</Text>
        </View>

        {debt.status === 'active' && (
          <Button
            title={loading ? <ActivityIndicator color="#fff" /> : 'Отметить оплаченным'}
            onPress={handlePay}
            disabled={loading}
          />
        )}
      </View>
    </View>
  );
}