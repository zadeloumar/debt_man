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
import { createUser, deleteUser, getUsers, blockUser } from '../../api/admin';
import { Header } from '../../components/common/Header';
import { StatCard } from '../../components/common/StatCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const roles = [
  { value: 'seller', label: 'Продавец' },
  { value: 'admin', label: 'Админ' },
  { value: 'factory', label: 'Склад' },
];

export default function AdminUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', phone: '', password: '', role: 'seller' });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (_error) {
      Alert.alert('Ошибка', 'Не удалось загрузить пользователей');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const updateField = (field, value) => {
    setNewUser((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setNewUser({ name: '', phone: '', password: '', role: 'seller' });
    setShowCreateForm(false);
  };

  const handleCreate = async () => {
    if (!newUser.name || !newUser.phone || !newUser.password) {
      Alert.alert('Ошибка', 'Заполните имя, телефон и пароль');
      return;
    }

    try {
      await createUser(newUser);
      Alert.alert('Успех', 'Пользователь создан');
      resetForm();
      await loadUsers();
    } catch (error) {
      Alert.alert('Ошибка', error.response?.data?.message || 'Не удалось создать пользователя');
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Подтверждение', 'Удалить пользователя?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteUser(id);
            await loadUsers();
          } catch (_error) {
            Alert.alert('Ошибка', 'Не удалось удалить пользователя');
          }
        },
      },
    ]);
  };

  const handleBlock = async (id, currentBlocked) => {
    try {
      await blockUser(id, !currentBlocked);
      await loadUsers();
    } catch (_error) {
      Alert.alert('Ошибка', 'Не удалось изменить статус');
    }
  };

  const filteredUsers = users.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.name?.toLowerCase().includes(query) ||
      item.phone?.toString().includes(query) ||
      item.role?.toLowerCase().includes(query)
    );
  });

  const blockedCount = users.filter((item) => item.is_blocked).length;

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userMain}>
        <View style={styles.userIconWrap}>
          <Ionicons
            name={item.is_blocked ? 'lock-closed-outline' : 'person-outline'}
            size={22}
            color={item.is_blocked ? colors.warning : colors.lightBlue}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name || 'Без имени'}</Text>
          <Text style={styles.userMeta}>{item.phone || 'Телефон не указан'}</Text>
          <View style={styles.tagsRow}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>{item.role || 'role?'}</Text>
            </View>
            <Text style={[styles.statusText, item.is_blocked && styles.statusTextBlocked]}>
              {item.is_blocked ? 'Заблокирован' : 'Активен'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => handleBlock(item.id, item.is_blocked)}
          style={styles.actionButton}
        >
          <Ionicons
            name={item.is_blocked ? 'lock-open-outline' : 'lock-closed-outline'}
            size={20}
            color={colors.warning}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Пользователи" showBackButton onBackPress={() => navigation.goBack()} />
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.heroCard}>
              <Text style={styles.heroTitle}>Управляйте командами и доступом</Text>
              <Text style={styles.heroText}>
                Здесь можно быстро найти пользователя, изменить статус или создать новый аккаунт.
              </Text>
            </View>

            <View style={styles.statsRow}>
              <StatCard value={users.length} label="Всего пользователей" />
              <StatCard value={blockedCount} label="Заблокировано" color={colors.warning} />
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={18} color={colors.gray} />
              <TextInput
                style={styles.searchInput}
                placeholder="Поиск по имени, телефону или роли"
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

            <TouchableOpacity
              style={styles.toggleButton}
              activeOpacity={0.85}
              onPress={() => setShowCreateForm((current) => !current)}
            >
              <Ionicons name={showCreateForm ? 'remove-circle-outline' : 'add-circle-outline'} size={20} color={colors.darkBlue} />
              <Text style={styles.toggleButtonText}>
                {showCreateForm ? 'Скрыть форму создания' : 'Добавить пользователя'}
              </Text>
            </TouchableOpacity>

            {showCreateForm ? (
              <View style={styles.formCard}>
                <Text style={styles.formTitle}>Новый пользователь</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Имя"
                  placeholderTextColor={colors.gray}
                  value={newUser.name}
                  onChangeText={(value) => updateField('name', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Телефон"
                  placeholderTextColor={colors.gray}
                  value={newUser.phone}
                  keyboardType="phone-pad"
                  onChangeText={(value) => updateField('phone', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  placeholderTextColor={colors.gray}
                  value={newUser.password}
                  secureTextEntry
                  onChangeText={(value) => updateField('password', value)}
                />
                <View style={styles.roleRow}>
                  {roles.map((role) => (
                    <TouchableOpacity
                      key={role.value}
                      onPress={() => updateField('role', role.value)}
                      style={[styles.roleButton, newUser.role === role.value && styles.roleButtonActive]}
                    >
                      <Text style={[styles.roleButtonText, newUser.role === role.value && styles.roleButtonTextActive]}>
                        {role.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.createButton} onPress={handleCreate} activeOpacity={0.85}>
                  <Text style={styles.createButtonText}>Создать пользователя</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {loading && !refreshing ? <Text style={styles.helperText}>Загружаем пользователей...</Text> : null}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={28} color={colors.gray} />
            <Text style={styles.emptyTitle}>Ничего не найдено</Text>
            <Text style={styles.emptyText}>Попробуйте очистить поиск или создать нового пользователя.</Text>
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
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 18,
    paddingVertical: 14,
    marginBottom: spacing.md,
  },
  toggleButtonText: {
    color: colors.darkBlue,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
  formCard: {
    backgroundColor: '#08213E',
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.24)',
  },
  formTitle: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.navyBlue,
    color: colors.cream,
    padding: spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.lightBlue,
    marginBottom: spacing.sm,
  },
  roleRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  roleButton: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingVertical: 12,
    borderRadius: 14,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: colors.lightBlue,
  },
  roleButtonText: {
    color: colors.cream,
    fontWeight: '600',
    fontSize: 13,
  },
  roleButtonTextActive: {
    color: colors.darkBlue,
  },
  createButton: {
    backgroundColor: colors.success,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  helperText: {
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  userCard: {
    backgroundColor: '#08213E',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.2)',
  },
  userMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(110, 172, 218, 0.12)',
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: colors.cream,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  userMeta: {
    color: colors.lightBlue,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  roleBadge: {
    backgroundColor: colors.darkBlue,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginRight: spacing.sm,
  },
  roleBadgeText: {
    color: colors.cream,
    fontSize: 12,
    fontWeight: '700',
  },
  statusText: {
    color: colors.success,
    fontWeight: '600',
  },
  statusTextBlocked: {
    color: colors.warning,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.md,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
    marginLeft: spacing.sm,
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
    lineHeight: 20,
    maxWidth: 260,
  },
});
