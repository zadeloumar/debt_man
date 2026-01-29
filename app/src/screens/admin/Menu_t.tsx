  import React from 'react';
  import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    SafeAreaView,
  } from 'react-native';
  import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

  // Цветовая палитра
  const colors = {
    darkBlue: '#021526',
    navyBlue: '#03346E',
    lightBlue: '#6EACDA',
    cream: '#E2E2B6',
    white: '#FFFFFF',
    gray: '#8E8E93',
  };

  export default function AdminMenu() {
    const menuItems = [
      {
        id: 1,
        title: 'Список магазинов',
        icon: 'storefront',
        iconType: 'material',
        description: 'Управление магазинами сети',
        badge: 5,
        color: colors.lightBlue,
      },
      {
        id: 2,
        title: 'Черный список',
        icon: 'ban',
        iconType: 'feather',
        description: 'Клиенты с просроченными долгами',
        badge: 12,
        color: '#FF6B6B',
      },
      {
        id: 3,
        title: 'Новости',
        icon: 'newspaper',
        iconType: 'ionicons',
        description: 'Публикация новостей для продавцов',
        badge: 3,
        color: '#4ECDC4',
      },
      {
        id: 4,
        title: 'Экстренные сообщения',
        icon: 'alert-circle',
        iconType: 'feather',
        description: 'Срочные уведомления для всех',
        badge: 1,
        color: '#FFD93D',
      },
      {
        id: 5,
        title: 'Запросы продавцов',
        icon: 'people',
        iconType: 'ionicons',
        description: 'Обращения от сотрудников',
        badge: 7,
        color: '#6BCF7F',
      },
      {
        id: 6,
        title: 'Статистика',
        icon: 'stats-chart',
        iconType: 'ionicons',
        description: 'Аналитика по всем магазинам',
        color: '#9D53F9',
      },
      {
        id: 7,
        title: 'Отчеты',
        icon: 'document-text',
        iconType: 'ionicons',
        description: 'Генерация финансовых отчетов',
        color: '#FF8E53',
      },
      {
        id: 8,
        title: 'Настройки',
        icon: 'settings',
        iconType: 'ionicons',
        description: 'Настройки системы',
        color: colors.gray,
      },
    ];

    const getIconComponent = (
      iconType: string,
      iconName: string,
      color: string,
      size: number
    ) => {
      switch (iconType) {
        case 'material':
          return <MaterialIcons name={iconName as any} size={size} color={color} />;
        case 'feather':
          return <Feather name={iconName as any} size={size} color={color} />;
        default:
          return <Ionicons name={iconName as any} size={size} color={color} />;
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
        
        {/* Шапка */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>АД</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Добро пожаловать,</Text>
              <Text style={styles.userName}>Администратор</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={colors.cream} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Статистика вверху */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Магазина</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Продавца</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#FF6B6B' }]}>2.4М</Text>
            <Text style={styles.statLabel}>Долги</Text>
          </View>
        </View>

        {/* Заголовок меню */}
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Панель управления</Text>
          <Text style={styles.menuSubtitle}>Выберите раздел для управления</Text>
        </View>

        {/* Список меню */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => console.log(`Нажата кнопка: ${item.title}`)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                  {getIconComponent(item.iconType, item.icon, item.color, 24)}
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
                <View style={styles.menuItemRight}>
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={20} color={colors.gray} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Быстрые действия */}
          <View style={styles.quickActions}>
            <Text style={styles.quickActionsTitle}>Быстрые действия</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionButton}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#4ECDC420' }]}>
                  <Ionicons name="add-circle" size={24} color="#4ECDC4" />
                </View>
                <Text style={styles.quickActionText}>Добавить магазин</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#6BCF7F20' }]}>
                  <Ionicons name="person-add" size={24} color="#6BCF7F" />
                </View>
                <Text style={styles.quickActionText}>Добавить продавца</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#FFD93D20' }]}>
                  <Ionicons name="megaphone" size={24} color="#FFD93D" />
                </View>
                <Text style={styles.quickActionText}>Создать уведомление</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Нижнее меню */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color={colors.lightBlue} />
            <Text style={[styles.navText, { color: colors.lightBlue }]}>Главная</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="bar-chart" size={24} color={colors.gray} />
            <Text style={styles.navText}>Аналитика</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="chatbubbles" size={24} color={colors.gray} />
            <Text style={styles.navText}>Сообщения</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={24} color={colors.gray} />
            <Text style={styles.navText}>Профиль</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkBlue,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.navyBlue,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      borderWidth: 2,
      borderColor: colors.lightBlue,
    },
    avatarText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.cream,
    },
    greeting: {
      fontSize: 14,
      color: colors.lightBlue,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.cream,
    },
    notificationButton: {
      padding: 10,
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: '#FF6B6B',
      width: 18,
      height: 18,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationBadgeText: {
      color: colors.white,
      fontSize: 10,
      fontWeight: 'bold',
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.navyBlue,
      marginHorizontal: 20,
      borderRadius: 16,
      paddingVertical: 20,
      marginTop: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.cream,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.lightBlue,
      opacity: 0.9,
    },
    statDivider: {
      width: 1,
      backgroundColor: colors.lightBlue,
      opacity: 0.3,
    },
    menuHeader: {
      paddingHorizontal: 20,
      marginBottom: 15,
    },
    menuTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.cream,
      marginBottom: 5,
    },
    menuSubtitle: {
      fontSize: 14,
      color: colors.lightBlue,
      opacity: 0.8,
    },
    menuContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    menuGrid: {
      backgroundColor: colors.navyBlue,
      borderRadius: 16,
      padding: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#021F3E',
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    menuItemContent: {
      flex: 1,
    },
    menuItemTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.cream,
      marginBottom: 3,
    },
    menuItemDescription: {
      fontSize: 12,
      color: colors.lightBlue,
      opacity: 0.8,
    },
    menuItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    badge: {
      backgroundColor: '#FF6B6B',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 2,
      marginRight: 10,
    },
    badgeText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    quickActions: {
      marginBottom: 30,
    },
    quickActionsTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.cream,
      marginBottom: 15,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    quickActionButton: {
      backgroundColor: colors.navyBlue,
      borderRadius: 12,
      padding: 15,
      alignItems: 'center',
      width: '31%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    quickActionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    quickActionText: {
      fontSize: 12,
      color: colors.lightBlue,
      textAlign: 'center',
      fontWeight: '500',
    },
    bottomNav: {
      flexDirection: 'row',
      backgroundColor: colors.navyBlue,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingVertical: 12,
      paddingHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 10,
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 5,
    },
    navText: {
      fontSize: 11,
      color: colors.gray,
      marginTop: 4,
      fontWeight: '500',
    },
  });