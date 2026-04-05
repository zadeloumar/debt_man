import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { AuthContext, AuthProvider } from '../src/context/AuthContext';

// Экраны
import ClientPhoneScreen from '../src/screens/auth/ClientPhoneScreen';
import RoleSelectScreen from '../src/screens/auth/RoleSelectScreen';
import SellerLoginScreen from '../src/screens/auth/SellerLoginScreen';
import MyDebtsScreen from '../src/screens/client/MyDebtsScreen';
import AddDebtScreen from '../src/screens/seller/AddDebtScreen';
import DashboardScreen from '../src/screens/seller/DashboardScreen';
import DebtDetailScreen from '../src/screens/seller/DebtDetailScreen';

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
      <AppNavigator />
    </AuthProvider>
  );
}
