import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext, AuthProvider } from '../src/context/AuthContext';
import { colors } from '../src/theme/colors';

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
  const { sellerToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.darkBlue }}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </View>
    );
  }

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
