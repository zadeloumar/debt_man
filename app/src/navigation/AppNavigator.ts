import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../../index';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : user.role === 'ADMIN' ? (
          <Stack.Screen name="AdminDashboard" component={() => null} />
        ) : user.role === 'SELLER' ? (
          <Stack.Screen name="SellerDashboard" component={() => null} />
        ) : (
          <Stack.Screen name="ClientDashboard" component={() => null} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

