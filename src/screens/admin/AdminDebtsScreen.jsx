import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteDebt, getAllDebts } from '../../api/admin';
import { Header } from '../../components/common/Header';
import { StatCard } from '../../components/common/StatCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function AdminDebtsScreen({ navigation }) {
  const [debts, setDebts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadDebts = async () => {
    try {
      setLoading(true);
      const res = await getAllDebts();
      setDebts(Array.isArray(res.data) ? res.data : []);
    } catch (_error) {
      Alert.alert('Ошибка', 'Не удалось загрузить долги');
    } finally {
      setLoading(false);
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

  const handleDelete = (id) => {
    Alert.alert('Подтверждение', 'Удалить долг?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDebt(id);
            await loadDebts();
          } catch (_error) {
            Alert.alert('Ошибка', 'Не удалось удалить долг');
          }
        },
      },
    ]);
  };

  const filteredDebts = debts.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      item.customer?.toLowerCase().includes(query) ||
      item.phone?.toString().includes(query) ||
      item.seller?.toLowerCase().includes(query) ||
      item.status?.toLowerCase().includes(query)
    );
  });

  const activeTotal = debts.reduce((sum, item) => {
    return item.status === 'active' ? sum + Number(item.amount || 0) : sum;
  }, 0);

  const formatDate = (value) => {
    if (!value) return 'Без срока';
    return String(value).split('T')[0];
  };

  const renderItem = ({ item }) => (
    <View style={styles.debtCard}>
      <View style={styles.debtHeader}>
        <View style={styles.personWrap}>
          <Ionicons name="wallet-outline" size={22} color={colors.lightBlue} />
        </View>
        <View style={styles.debtInfo}>
          <Text style={styles.customerName}>{item.customer || 'Без имени'}</Text>
          <Text style={styles.metaText}>{item.phone || 'Телефон не указан'}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Продавец</Text>
        <Text style={styles.infoValue}>{item.seller || 'Не указан'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Сумма</Text>
        <Text style={styles.amountValue}>{Number(item.amount || 0).toFixed(2)} ₽</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Срок</Text>
        <Text style={styles.infoValue}>{formatDate(item.due_date)}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Статус</Text>
        <View style={[styles.statusBadge, item.status === 'active' ? styles.statusActive : styles.statusPaid]}>
          <Text style={styles.statusBadgeText}>{item.status === 'active' ? 'Активен' : 'Оплачен'}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Все долги" showBackButton onBackPress={() => navigation.goBack()} />
      <FlatList
        data={filteredDebts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}
        ListHeaderComponent={
          <View>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={18} color={colors.gray} />
              <TextInput
                style={styles.searchInput}
                placeholder="Поиск по клиенту, продавцу, телефону"
                placeholderTextColor={colors.gray}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color={colors.gray} />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.heroCard}>
              <Text style={styles.heroTitle}>Общая задолженность по системе</Text>
              <Text style={styles.heroText}>
                Просматривайте долги целиком, ищите по клиенту или продавцу и удаляйте ошибочные записи.
              </Text>
            </View>

            <View style={styles.statsRow}>
              <StatCard value={debts.length} label="Всего долгов" />
              <StatCard value={`${activeTotal.toFixed(2)} ₽`} label="Активная сумма" color={colors.error} />
            </View>

            

            {loading && !refreshing ? <Text style={styles.helperText}>Загружаем список долгов...</Text> : null}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={28} color={colors.gray} />
            <Text style={styles.emptyTitle}>Долги не найдены</Text>
            <Text style={styles.emptyText}>Проверьте поиск или обновите экран.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  listContent: {
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
  statsRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#08213E',
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.24)',
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    color: colors.cream,
    paddingVertical: 14,
    marginLeft: spacing.sm,
  },
  helperText: {
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  debtCard: {
    backgroundColor: '#08213E',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.2)',
  },
  debtHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  personWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(110, 172, 218, 0.12)',
    marginRight: spacing.md,
  },
  debtInfo: {
    flex: 1,
  },
  customerName: {
    color: colors.cream,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  metaText: {
    color: colors.lightBlue,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    color: colors.gray,
  },
  infoValue: {
    color: colors.cream,
    fontWeight: '600',
  },
  amountValue: {
    color: colors.error,
    fontWeight: '800',
    fontSize: 16,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  statusActive: {
    backgroundColor: 'rgba(244, 67, 54, 0.16)',
  },
  statusPaid: {
    backgroundColor: 'rgba(76, 175, 80, 0.18)',
  },
  statusBadgeText: {
    color: colors.cream,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyText: {
    color: colors.gray,
    textAlign: 'center',
  },
});
