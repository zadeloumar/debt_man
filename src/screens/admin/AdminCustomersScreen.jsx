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
import { deleteCustomer, getCustomers } from '../../api/admin';
import { Header } from '../../components/common/Header';
import { StatCard } from '../../components/common/StatCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function AdminCustomersScreen({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomers();
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (_error) {
      Alert.alert('Ошибка', 'Не удалось загрузить клиентов');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCustomers();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomers();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Подтверждение', 'Удалить клиента? Все его долги тоже удалятся.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteCustomer(id);
            await loadCustomers();
          } catch (_error) {
            Alert.alert('Ошибка', 'Не удалось удалить клиента');
          }
        },
      },
    ]);
  };

  const filteredCustomers = customers.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return item.name?.toLowerCase().includes(query) || item.phone?.toString().includes(query);
  });

  const renderItem = ({ item }) => (
    <View style={styles.customerCard}>
      <View style={styles.customerHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="person-circle-outline" size={24} color={colors.lightBlue} />
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name || 'Без имени'}</Text>
          <Text style={styles.customerPhone}>{item.phone || 'Телефон не указан'}</Text>
          {item.debts_count !== undefined ? (
            <Text style={styles.customerHint}>Долгов: {item.debts_count}</Text>
          ) : null}
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Клиенты" showBackButton onBackPress={() => navigation.goBack()} />
      <FlatList
        data={filteredCustomers}
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
                placeholder="Поиск по имени или телефону"
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
              <Text style={styles.heroTitle}>Клиентская база под рукой</Text>
              <Text style={styles.heroText}>
                Ищите клиентов по имени или номеру телефона и удаляйте лишние записи без путаницы.
              </Text>
            </View>

            <View style={styles.statsRow}>
              <StatCard value={customers.length} label="Всего клиентов" />
              <StatCard value={filteredCustomers.length} label="Показано сейчас" color={colors.info} />
            </View>
            {loading && !refreshing ? <Text style={styles.helperText}>Загружаем клиентов...</Text> : null}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="call-outline" size={28} color={colors.gray} />
            <Text style={styles.emptyTitle}>Клиенты не найдены</Text>
            <Text style={styles.emptyText}>Попробуйте изменить поисковый запрос или обновить экран.</Text>
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
  customerCard: {
    backgroundColor: '#08213E',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.2)',
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(110, 172, 218, 0.12)',
    marginRight: spacing.md,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    color: colors.cream,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  customerPhone: {
    color: colors.lightBlue,
  },
  customerHint: {
    color: colors.gray,
    marginTop: spacing.xs,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
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
