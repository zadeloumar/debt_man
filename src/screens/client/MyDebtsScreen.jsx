import React, { useCallback, useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import { MenuItem } from '../../components/common/MenuItem';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyDebtsScreen({ route, navigation }) {
  const { debts, phone } = route.params;
  console.log('Полученные долги:', debts);
  const totalDebt = debts.reduce((sum, d) => {
  // Превращаем строку "123.00" в число 123
  const amount = Number(d.amount) || 0; 
  
  return sum + (d.status === 'active' ? amount : 0);
}, 0);

console.log(totalDebt); // Выведет 369

  const renderDebt = ({ item }) => (
    <MenuItem
      title={item.shop}
      description={`${item.amount} ₽ • до ${item.due_date}`}
      icon={<Ionicons name="storefront" size={24} color={colors.lightBlue} />}
      badge={item.status === 'active' ? item.amount : undefined}
      onPress={() => {}}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Ваши долги" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Информация по номеру {phone}</Text>
          <Text style={styles.heroText}>
            Ниже показаны все найденные задолженности. </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Общий активный долг</Text>
          <Text style={styles.summaryValue}>{totalDebt} ₽</Text>
        </View>
      </View>
      <FlatList
        data={debts}
        renderItem={renderDebt}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.xxl }}
        ListEmptyComponent={
          <Text style={{ color: colors.gray, textAlign: 'center', marginTop: 50 }}>Нет задолженностей</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.navyBlue,
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.3)',
  },
  heroTitle: {
    color: colors.cream,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  heroText: {
    color: colors.gray,
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: '#08213E',
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.2)',
  },
  summaryLabel: {
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    color: colors.error,
    fontSize: 28,
    fontWeight: '800',
  },
});
