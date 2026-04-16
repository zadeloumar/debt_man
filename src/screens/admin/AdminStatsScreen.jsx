import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStats } from '../../api/admin';
import { Header } from '../../components/common/Header';
import { StatCard } from '../../components/common/StatCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function AdminStatsScreen({ navigation }) {
  const [stats, setStats] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data || {});
    } catch (_error) {
      Alert.alert('Ошибка', 'Не удалось загрузить статистику');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  if (!stats) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </SafeAreaView>
    );
  }

  const summaryItems = [
    {
      label: 'Пользователи',
      value: stats.users ?? 0,
      icon: 'people-outline',
      color: colors.lightBlue,
    },
    {
      label: 'Клиенты',
      value: stats.customers ?? 0,
      icon: 'person-outline',
      color: colors.info,
    },
    {
      label: 'Долги',
      value: stats.debts ?? 0,
      icon: 'wallet-outline',
      color: colors.warning,
    },
    {
      label: 'Сумма долга',
      value: `${Number(stats.total_debt ?? 0).toFixed(2)} ₽`,
      icon: 'bar-chart-outline',
      color: colors.error,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Статистика" showBackButton onBackPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Состояние системы в одном экране</Text>
          <Text style={styles.heroText}>
            Сверяйте основные цифры без переходов по разделам. Это удобно для быстрой проверки после изменений в базе.
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard value={summaryItems[0].value} label={summaryItems[0].label} color={summaryItems[0].color} />
            <StatCard value={summaryItems[1].value} label={summaryItems[1].label} color={summaryItems[1].color} />
          </View>
          <View style={styles.statsRow}>
            <StatCard value={summaryItems[2].value} label={summaryItems[2].label} color={summaryItems[2].color} />
            <StatCard value={summaryItems[3].value} label={summaryItems[3].label} color={summaryItems[3].color} />
          </View>
        </View>

        <View style={styles.detailsCard}>
          {summaryItems.map((item) => (
            <View key={item.label} style={styles.detailRow}>
              <View style={styles.detailIconWrap}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  heroCard: {
    backgroundColor: colors.navyBlue,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.3)',
  },
  heroTitle: {
    color: colors.cream,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  heroText: {
    color: colors.gray,
    lineHeight: 21,
  },
  statsGrid: {
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  detailsCard: {
    backgroundColor: '#08213E',
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.22)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  detailIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
    marginRight: spacing.sm,
  },
  detailLabel: {
    flex: 1,
    color: colors.gray,
  },
  detailValue: {
    color: colors.cream,
    fontWeight: '700',
  },
});
