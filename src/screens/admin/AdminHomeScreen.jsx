import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const menuItems = [
  {
    key: 'AdminUsers',
    title: 'Пользователи',
    description: 'Создание, блокировка и удаление учетных записей.',
    icon: 'people-outline',
  },
  {
    key: 'AdminDebts',
    title: 'Все долги',
    description: 'Просмотр всей задолженности и быстрые действия.',
    icon: 'wallet-outline',
  },
  {
    key: 'AdminCustomers',
    title: 'Клиенты',
    description: 'Список клиентов с поиском и очисткой базы.',
    icon: 'call-outline',
  },
  {
    key: 'AdminStats',
    title: 'Статистика',
    description: 'Основные показатели системы в одном месте.',
    icon: 'bar-chart-outline',
  },
];

export default function AdminHomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Админ панель"
        rightButton={
          <TouchableOpacity onPress={logout} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="log-out-outline" size={24} color={colors.error} />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroKicker}>Панель управления</Text>
          <Text style={styles.heroText}>Контролируйте пользователей, долги и клиентов без лишних переходов</Text>
          
        </View>

        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.key)}
          >
            <View style={styles.menuIconWrap}>
              <Ionicons name={item.icon} size={24} color={colors.cream} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={colors.lightBlue} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  heroCard: {
    backgroundColor: colors.navyBlue,
    borderRadius: 28,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.35)',
  },
  heroKicker: {
    color: colors.lightBlue,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  heroTitle: {
    color: colors.cream,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: spacing.sm,
  },
  heroText: {
    color: colors.gray,
    fontSize: 15,
    lineHeight: 22,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#08213E',
    borderRadius: 22,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.22)',
  },
  menuIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(110, 172, 218, 0.14)',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  menuDescription: {
    color: colors.gray,
    lineHeight: 19,
  },
});
