import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSellerDebts } from '../../api/debts';
import { Header } from '../../components/common/Header';
import { StatCard } from '../../components/common/StatCard';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function DashboardScreen({ navigation }) {
  const [debts, setDebts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' или 'date'
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  
  const { logout } = useContext(AuthContext);

  const formatDate = (isoString) => {
    if (!isoString) return 'нет даты';
    return isoString.split('T')[0];
  };

  const loadDebts = async () => {
    try {
      const response = await getSellerDebts();
      let debtsData = response.data;
      debtsData = debtsData.map(d => ({ ...d, amount: parseFloat(d.amount) }));
      setDebts(debtsData);
      const total = debtsData.reduce((sum, d) => sum + (d.status === 'active' ? d.amount : 0), 0);
      setTotalDebt(total);
    } catch (_error) {
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

  // Единая функция: поиск + фильтр по статусу + сортировка
  const getProcessedDebts = () => {
    let result = [...debts];

    // 1. Поиск по имени или телефону
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(debt =>
        debt.name.toLowerCase().includes(query) ||
        (debt.phone && debt.phone.toString().includes(query))
      );
    }

    // 2. Фильтр по статусу (только активные)
    if (showOnlyActive) {
      result = result.filter(d => d.status === 'active');
    }

    // 3. Сортировка
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    }

    return result;
  };

  const displayedDebts = getProcessedDebts();

  const clearSearch = () => setSearchQuery('');

  const renderDebtItem = ({ item }) => {
    const isPaid = item.status === 'paid';
    return (
      <TouchableOpacity
        style={[styles.debtCard, isPaid && styles.debtCardPaid]}
        onPress={() => navigation.navigate('DebtDetail', { debt: item })}
        activeOpacity={0.7}
      >
        <View style={styles.debtCardLeft}>
          <Ionicons
            name={isPaid ? "checkmark-circle" : "person-circle-outline"}
            size={40}
            color={isPaid ? colors.success : colors.lightBlue}
          />
        </View>
        <View style={styles.debtCardContent}>
          <Text style={[styles.debtName, isPaid && styles.debtNamePaid]}>{item.name}</Text>
          <Text style={[styles.debtAmount, isPaid && styles.debtAmountPaid]}>{item.amount} ₽</Text>
          <Text style={[styles.debtDue, isPaid && styles.debtDuePaid]}>до {formatDate(item.due_date)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.gray} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header
        title="Мои долги"
        leftButton={
          <TouchableOpacity onPress={logout} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="exit-outline" size={24} color={colors.error} />
          </TouchableOpacity>
        }
        rightButton={
          <TouchableOpacity onPress={() => navigation.navigate('AddDebt')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="add-circle" size={28} color={colors.cream} />
          </TouchableOpacity>
        }
      />
      <View style={{ flexDirection: 'row', padding: spacing.sm }}>
        <StatCard value={debts.length} label="Всего записей" />
        <StatCard value={`${totalDebt.toFixed(2)} ₽`} label="Активный долг" color={colors.error} />
      </View>
      <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск по имени"
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color={colors.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.sortContainer}>
        <TouchableOpacity 
          style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]} 
          onPress={() => setSortBy('name')}
        >
          <Text style={styles.sortButtonText}>По имени</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sortButton, sortBy === 'date' && styles.sortButtonActive]} 
          onPress={() => setSortBy('date')}
        >
          <Text style={styles.sortButtonText}>По дате</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, showOnlyActive && styles.filterButtonActive]} 
          onPress={() => setShowOnlyActive(!showOnlyActive)}
        >
          <Text style={styles.sortButtonText}>
            {showOnlyActive ? 'Все долги' : 'Активные'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayedDebts}
        renderItem={renderDebtItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.lg }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: colors.gray }}>
              {searchQuery ? 'Ничего не найдено' : 'Нет долгов'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  debtCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navyBlue,
    borderRadius: 16,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  debtCardPaid: {
    opacity: 0.7,
    backgroundColor: colors.navyBlue + '80',
  },
  debtCardLeft: { marginRight: spacing.md },
  debtCardContent: { flex: 1 },
  debtName: { color: colors.cream, fontSize: 16, fontWeight: '600' },
  debtNamePaid: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  debtAmount: { color: colors.error, fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  debtAmountPaid: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  debtDue: { color: colors.gray, fontSize: 12, marginTop: 2 },
  debtDuePaid: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navyBlue,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
  searchIcon: { marginRight: spacing.sm },
  searchInput: {
    flex: 1,
    color: colors.cream,
    paddingVertical: spacing.sm,
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sortButton: {
    flex: 1,
    backgroundColor: colors.navyBlue,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  sortButtonActive: {
    backgroundColor: colors.lightBlue,
  },
  sortButtonText: {
    color: colors.cream,
    fontWeight: '600',
  },
  filterButton: {
    flex: 1,
    backgroundColor: colors.navyBlue,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: colors.error,
  },
});
