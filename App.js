import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

// Экраны
import RoleSelectScreen from './src/screens/auth/RoleSelectScreen';
import SellerLoginScreen from './src/screens/auth/SellerLoginScreen';
import ClientPhoneScreen from './src/screens/auth/ClientPhoneScreen';
import DashboardScreen from './src/screens/seller/DashboardScreen';
import AddDebtScreen from './src/screens/seller/AddDebtScreen';
import DebtDetailScreen from './src/screens/seller/DebtDetailScreen';
import MyDebtsScreen from './src/screens/client/MyDebtsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { sellerToken } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {sellerToken ? (
        // Продавец авторизован
        <>
          <Stack.Screen name="SellerDashboard" component={DashboardScreen} />
          <Stack.Screen name="AddDebt" component={AddDebtScreen} />
          <Stack.Screen name="DebtDetail" component={DebtDetailScreen} />
        </>
      ) : (
        // Не авторизован – показываем выбор роли
        <>
          <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
          <Stack.Screen name="SellerLogin" component={SellerLoginScreen} />
          <Stack.Screen name="ClientPhone" component={ClientPhoneScreen} />
          <Stack.Screen name="MyDebts" component={MyDebtsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}