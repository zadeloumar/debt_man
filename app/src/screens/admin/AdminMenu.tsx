// src/screens/admin/AdminMenu.tsx
import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Text, Button } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

// Импорт компонентов
import { Header } from '../../components/common/Header';
import { StatCard } from '../../components/common/StatCard';
import { MenuItem } from '../../components/common/MenuItem';
import { QuickActionButton } from '../../components/common/QuickActionButton';
import { BottomNav , BottomNavItem } from '../../components/navigation/BottomNav';
// import type { BottomNavItem } from '../../components/navigation/BottomNav';

// Импорт темы
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { router } from 'expo-router';

const AdminMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    {
      id: 'shops',
      title: 'Список магазинов',
      description: 'Управление магазинами сети',
      icon: <MaterialIcons name="storefront" size={24} color={colors.lightBlue} />,
      badge: 5,
    },
    // ... остальные элементы
  ];

  const navItems: BottomNavItem[] = [
    { id: 'home', label: 'Главная', icon: 'home' },
    { id: 'stats', label: 'Аналитика', icon: 'bar-chart' },
    { id: 'messages', label: 'Сообщения', icon: 'chatbubbles' },
    { id: 'profile', label: 'Профиль', icon: 'person' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
      
      <Header
        title="Панель управления"
        subtitle="Добро пожаловать, Администратор"
      />

      <ScrollView>
        {/* Статистика */}
        <View style={{ flexDirection: 'row', padding: spacing.md }}>
          <StatCard value="24" label="Магазина" />
          <StatCard value="156" label="Продавца" />
          <StatCard value="2.4М" label="Долги" color={colors.error} />
        </View>

        {/* Меню */}
        <View style={{ padding: spacing.md }}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              badge={item.badge}
              onPress={() => {console.log(`Нажато: ${item.title}`);
                              router.push("./ShopsListScreen");}}
            />
          ))}
        </View>

        {/* Быстрые действия */}
        <View style={{ padding: spacing.md }}>
          <Text style={{ color: colors.cream, fontSize: 18, marginBottom: spacing.md }}>
            Быстрые действия
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <QuickActionButton
              title="Добавить магазин"
              icon={<Ionicons name="add-circle" size={24} color="#4ECDC4" />}
              onPress={() => {}}
              color="#4ECDC4"
            />
            {/* Другие кнопки */}
          </View>
        </View>
      </ScrollView>

      <BottomNav
        items={navItems}
        activeItem={activeTab}
        onItemPress={setActiveTab}
      />
    </SafeAreaView>
  );
};

export default AdminMenu;