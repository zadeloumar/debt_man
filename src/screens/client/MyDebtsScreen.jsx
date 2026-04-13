// screens/client/MyDebtsScreen.jsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header } from '../../components/common/Header';
import { MenuItem } from '../../components/common/MenuItem';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyDebtsScreen({ route, navigation }) {
  const { debts, phone } = route.params;

  const totalDebt = debts.reduce((sum, d) => sum + (d.status === 'active' ? d.amount : 0), 0);

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
      <View style={{ padding: spacing.md }}>
        <Text style={{ color: colors.cream, fontSize: 16 }}>Телефон: {phone}</Text>
        <Text style={{ color: colors.error, fontSize: 24, fontWeight: 'bold', marginTop: spacing.sm }}>
          Общий долг: {totalDebt} ₽
        </Text>
      </View>
      <FlatList
        data={debts}
        renderItem={renderDebt}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        ListEmptyComponent={
          <Text style={{ color: colors.gray, textAlign: 'center', marginTop: 50 }}>Нет задолженностей</Text>
        }
      />
    </SafeAreaView>
  );
}