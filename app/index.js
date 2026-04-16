import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from '../src/context/AuthContext';

import ApiSaveScreen from '../src/screens/auth/ApiSaveScreen'

// Общие экраны
import RoleSelectScreen from '../src/screens/auth/RoleSelectScreen';
import SellerLoginScreen from '../src/screens/auth/SellerLoginScreen';
import ClientPhoneScreen from '../src/screens/auth/ClientPhoneScreen';
import DashboardScreen from '../src/screens/seller/DashboardScreen';
import AddDebtScreen from '../src/screens/seller/AddDebtScreen';
import DebtDetailScreen from '../src/screens/seller/DebtDetailScreen';
import MyDebtsScreen from '../src/screens/client/MyDebtsScreen';

// Админские экраны
import AdminHomeScreen from '../src/screens/admin/AdminHomeScreen';
import AdminUsersScreen from '../src/screens/admin/AdminUsersScreen';
import AdminDebtsScreen from '../src/screens/admin/AdminDebtsScreen';
import AdminCustomersScreen from '../src/screens/admin/AdminCustomersScreen';
import AdminStatsScreen from '../src/screens/admin/AdminStatsScreen';
import { colors } from '../src/theme/colors';

const Stack = createStackNavigator();

function AppNavigator() {
  const { sellerToken, userRole, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.darkBlue }}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </View>
    );
  }

  // Если администратор
  if (sellerToken && userRole === 'admin') {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="AdminUsers" component={AdminUsersScreen} />
      <Stack.Screen name="AdminDebts" component={AdminDebtsScreen} />
      <Stack.Screen name="AdminCustomers" component={AdminCustomersScreen} />
      <Stack.Screen name="AdminStats" component={AdminStatsScreen} />
    </Stack.Navigator>
  );
}

  // Если продавец авторизован
  if (sellerToken && userRole === 'seller') {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SellerDashboard" component={DashboardScreen} />
        <Stack.Screen name="AddDebt" component={AddDebtScreen} />
        <Stack.Screen name="DebtDetail" component={DebtDetailScreen} />
      </Stack.Navigator>
    );
  }

  // Не авторизован – выбор роли
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="ApiSave" component={ApiSaveScreen} />
      <Stack.Screen name="SellerLogin" component={SellerLoginScreen} />
      <Stack.Screen
        name="AdminLogin"
        component={SellerLoginScreen}
        initialParams={{
          screenTitle: 'Вход администратора',
          screenSubtitle: 'Используйте администраторский аккаунт для управления системой.',
        }}
      />
      <Stack.Screen name="ClientPhone" component={ClientPhoneScreen} />
      <Stack.Screen name="MyDebts" component={MyDebtsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
