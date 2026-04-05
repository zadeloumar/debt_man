// screens/seller/DashboardScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, Alert, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../components/common/Header';
import { MenuItem } from '../../components/common/MenuItem';
import { StatCard } from '../../components/common/StatCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getSellerDebts } from '../../api/debts';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
  const [debts, setDebts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);

  const loadDebts = async () => {
    try {
      const response = await getSellerDebts();
      const debtsData = response.data;
      setDebts(debtsData);
      const total = debtsData.reduce((sum, d) => {
        const amount = parseFloat(d.amount);
        return sum + (d.status === 'active' ? amount : 0);
      }, 0);
      setTotalDebt(total);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить долги');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDebts();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDebts();
    setRefreshing(false);
  };

  const renderDebtItem = ({ item }) => (
    <MenuItem
      title={item.name}
      description={`${item.amount} ₽ • до ${item.due_date}`}
      icon={<Ionicons name="cash" size={24} color={item.status === 'active' ? colors.error : colors.success} />}
      badge={item.status === 'active' ? item.amount : undefined}
      onPress={() => navigation.navigate('DebtDetail', { debt: item })}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header
        title="Мои долги"
        rightButton={
          <Ionicons
            name="add-circle"
            size={28}
            color={colors.cream}
            onPress={() => navigation.navigate('AddDebt')}
          />
        }
      />
      <View style={{ flexDirection: 'row', padding: spacing.md }}>
        <StatCard value={debts.length} label="Всего записей" />
        <StatCard value={`${totalDebt} ₽`} label="Активный долг" color={colors.error} />
      </View>
      <FlatList
        data={debts}
        renderItem={renderDebtItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: colors.gray }}>Нет долгов</Text>
          </View>
        }
      />
    </View>
  );
}