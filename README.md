# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



src/
├── api/
│   ├── client.js       # axios instance с интерцепторами
│   ├── auth.js         # функции для /login
│   ├── debts.js        # функции для /debts
│   └── customers.js    # функция для /my-debts/:phone
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── StatCard.jsx
│   │   ├── MenuItem.jsx
│   │   ├── Button.jsx
│   │   └── Input.jsx   # добавим стилизованный инпут
│   └── navigation/
│       └── BottomNav.jsx
├── screens/
│   ├── auth/
│   │   ├── RoleSelectScreen.jsx
│   │   ├── SellerLoginScreen.jsx
│   │   └── ClientPhoneScreen.jsx
│   ├── seller/
│   │   ├── DashboardScreen.jsx
│   │   ├── AddDebtScreen.jsx
│   │   └── DebtDetailScreen.jsx
│   └── client/
│       └── MyDebtsScreen.jsx
├── context/
│   └── AuthContext.jsx   # для хранения токена продавца
├── theme/
│   ├── colors.js
│   └── spacing.js
├── utils/
│   └── storage.js        # работа с AsyncStorage
└── App.js

npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install axios expo-constants
npm install @expo/vector-icons



Добавление поиска на экран DashboardScreen

Мы добавим текстовое поле для поиска под шапкой, которое будет фильтровать список долгов по имени должника.

📦 1. Новые импорты

Добавьте TextInput и, если нужно, иконку очистки:

```jsx
import { View, FlatList, RefreshControl, Alert, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
```

📝 2. Состояние для поиска

Добавьте в начало компонента:

```jsx
const [searchQuery, setSearchQuery] = useState('');
```

🔍 3. Функция фильтрации

Создайте filteredDebts, которая будет вычисляться на основе debts и searchQuery:

```jsx
const filteredDebts = debts.filter(debt =>
  debt.name.toLowerCase().includes(searchQuery.toLowerCase())
);
```

Если хотите искать ещё и по сумме, добавьте второе условие:

```jsx
const filteredDebts = debts.filter(debt =>
  debt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  debt.amount.toString().includes(searchQuery)
);
```

🧹 4. Очистка поиска

Функция для сброса:

```jsx
const clearSearch = () => setSearchQuery('');
```

🎨 5. Добавление поля поиска в интерфейс

Разместите его после статистических карточек:

```jsx
<View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Поиск по имени или сумме"
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
```

🧩 6. Обновление FlatList

Используйте filteredDebts вместо debts:

```jsx
<FlatList
  data={filteredDebts}
  renderItem={renderDebtItem}
  keyExtractor={(item) => item.id.toString()}
  // остальные пропсы
/>
```

Также обновите статистику: если нужно показывать сумму и количество по отфильтрованному списку, замените в StatCard значения на основе filteredDebts.

📐 7. Стили для поиска

Добавьте в StyleSheet:

```jsx
searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.navyBlue,
  borderRadius: 12,
  paddingHorizontal: spacing.sm,
  borderWidth: 1,
  borderColor: colors.lightBlue,
},
searchIcon: {
  marginRight: spacing.sm,
},
searchInput: {
  flex: 1,
  color: colors.cream,
  paddingVertical: spacing.sm,
  fontSize: 16,
},
```

🔄 8. Обновление статистики (опционально)

Если хотите, чтобы карточки статистики отображали данные только по отфильтрованным долгам, замените:

```jsx
<StatCard value={filteredDebts.length} label="Всего записей" />
<StatCard value={`${filteredDebts.reduce((sum, d) => sum + (d.status === 'active' ? d.amount : 0), 0).toFixed(2)} ₽`} label="Активный долг" color={colors.error} />
```

Если оставить исходные debts.length и totalDebt, статистика будет общей, а список – фильтрованным. Выберите нужный вариант.

📄 9. Полный пример итогового DashboardScreen.jsx

```jsx
// ... импорты
export default function DashboardScreen({ navigation }) {
  const [debts, setDebts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useContext(AuthContext);

  const formatDate = (isoString) => { /* ... */ };
  const loadDebts = async () => { /* ... */ };
  useFocusEffect(/* ... */);
  const onRefresh = /* ... */;

  const filteredDebts = debts.filter(debt =>
    debt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => setSearchQuery('');

  const renderDebtItem = ({ item }) => { /* ... */ };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue, paddingTop: spacing.md }}>
      <Header /* ... */ />
      <View style={{ flexDirection: 'row', padding: spacing.md }}>
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
      </View>umar
      <FlatList
        data={filteredDebts}
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
  // ... существующие стили
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
  searchInput: { flex: 1, color: colors.cream, paddingVertical: spacing.sm, fontSize: 16 },
});
```

🎯 Результат

· Пользователь вводит имя в поле поиска → список мгновенно фильтруется.
· Кнопка очистки появляется, когда есть текст.
· Если ничего не найдено, выводится соответствующее сообщение.

Поиск работает локально, без запросов к серверу, что быстро и удобно. При желании можно добавить дебаунс (задержку) для оптимизации, но для небольших списков это необязательно.

Отлично, теперь добавим **фронтенд-часть для администратора** в ваше React Native приложение.

---

## 🧱 1. Расширяем `AuthContext` – храним роль пользователя

Сейчас в `AuthContext` хранится только `sellerToken`. Нужно добавить `userRole` и получать его при логине.

### Измените `src/context/AuthContext.jsx`:

```jsx
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSeller } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sellerToken, setSellerToken] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'seller', 'admin', 'factory'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const token = await AsyncStorage.getItem('sellerToken');
    const role = await AsyncStorage.getItem('userRole');
    setSellerToken(token);
    setUserRole(role);
    setIsLoading(false);
  };

  const login = async (phone, password) => {
    try {
      const response = await loginSeller(phone, password);
      const { token, user } = response.data; // ожидаем, что бэкенд вернёт { token, user: { role, name, ... } }
      await AsyncStorage.setItem('sellerToken', token);
      await AsyncStorage.setItem('userRole', user.role);
      setSellerToken(token);
      setUserRole(user.role);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Ошибка входа' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('sellerToken');
    await AsyncStorage.removeItem('userRole');
    setSellerToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ sellerToken, userRole, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

> **Примечание:** Убедитесь, что ваш бэкенд при логине возвращает `user.role`. Если нет – добавьте в `authController.js`:
> ```js
> res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
> ```

---

## 📡 2. API для администратора

Создайте файл `src/api/admin.js`:

```jsx
import api from './client';

// ========== USERS ==========
export const getUsers = () => api.get('/admin/users');
export const createUser = (data) => api.post('/admin/users', data);
export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`);
export const blockUser = (userId, is_blocked) => api.put(`/admin/users/${userId}/block`, { is_blocked });

// ========== DEBTS ==========
export const getAllDebts = () => api.get('/admin/debts');
export const deleteDebt = (debtId) => api.delete(`/admin/debts/${debtId}`);

// ========== CUSTOMERS ==========
export const getCustomers = () => api.get('/admin/customers');
export const deleteCustomer = (customerId) => api.delete(`/admin/customers/${customerId}`);

// ========== STATS ==========
export const getStats = () => api.get('/admin/stats');
```

---

## 🧭 3. Навигация для администратора

В вашем проекте используется `Stack.Navigator` в `app/index.js` или `App.js`. Нужно добавить проверку роли и показывать разные экраны.

### Пример адаптации `App.js` (или `app/index.js`):

```jsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

// Общие экраны
import RoleSelectScreen from './src/screens/auth/RoleSelectScreen';
import SellerLoginScreen from './src/screens/auth/SellerLoginScreen';
import ClientPhoneScreen from './src/screens/auth/ClientPhoneScreen';
import DashboardScreen from './src/screens/seller/DashboardScreen';
import AddDebtScreen from './src/screens/seller/AddDebtScreen';
import DebtDetailScreen from './src/screens/seller/DebtDetailScreen';
import MyDebtsScreen from './src/screens/client/MyDebtsScreen';

// Админские экраны
import AdminUsersScreen from './src/screens/admin/AdminUsersScreen';
import AdminDebtsScreen from './src/screens/admin/AdminDebtsScreen';
import AdminCustomersScreen from './src/screens/admin/AdminCustomersScreen';
import AdminStatsScreen from './src/screens/admin/AdminStatsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { sellerToken, userRole, isLoading } = useContext(AuthContext);

  if (isLoading) return null; // или сплеш-экран

  // Если администратор
  if (sellerToken && userRole === 'admin') {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
      <Stack.Screen name="SellerLogin" component={SellerLoginScreen} />
      <Stack.Screen name="ClientPhone" component={ClientPhoneScreen} />
      <Stack.Screen name="MyDebts" component={MyDebtsScreen} />
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
```

---

## 🖥️ 4. Создаём экраны администратора

### 4.1 `src/screens/admin/AdminUsersScreen.jsx`

```jsx
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getUsers, createUser, deleteUser, blockUser } from '../../api/admin';
import { Ionicons } from '@expo/vector-icons';

export default function AdminUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', phone: '', password: '', role: 'seller' });

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить пользователей');
    }
  };

  useFocusEffect(useCallback(() => { loadUsers(); }, []));

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const handleCreate = async () => {
    if (!newUser.name || !newUser.phone || !newUser.password) {
      Alert.alert('Ошибка', 'Заполните имя, телефон и пароль');
      return;
    }
    try {
      await createUser(newUser);
      Alert.alert('Успех', 'Пользователь создан');
      setShowCreateForm(false);
      setNewUser({ name: '', phone: '', password: '', role: 'seller' });
      loadUsers();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать пользователя');
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Подтверждение', 'Удалить пользователя?', [
      { text: 'Отмена' },
      { text: 'Удалить', onPress: async () => {
          try {
            await deleteUser(id);
            loadUsers();
          } catch { Alert.alert('Ошибка', 'Не удалось удалить'); }
        }
      }
    ]);
  };

  const handleBlock = async (id, currentBlocked) => {
    try {
      await blockUser(id, !currentBlocked);
      loadUsers();
    } catch { Alert.alert('Ошибка', 'Не удалось изменить статус'); }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>📞 {item.phone}</Text>
        <Text style={styles.role}>Роль: {item.role}</Text>
        <Text style={styles.blocked}>Статус: {item.is_blocked ? 'Заблокирован' : 'Активен'}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleBlock(item.id, item.is_blocked)} style={styles.blockBtn}>
          <Ionicons name={item.is_blocked ? "lock-open" : "lock-closed"} size={24} color={colors.warning} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
          <Ionicons name="trash" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Управление пользователями" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={{ padding: spacing.md }}>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowCreateForm(!showCreateForm)}>
          <Text style={styles.addButtonText}>{showCreateForm ? 'Скрыть форму' : '+ Добавить пользователя'}</Text>
        </TouchableOpacity>

        {showCreateForm && (
          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Имя" placeholderTextColor={colors.gray} value={newUser.name} onChangeText={text => setNewUser({...newUser, name: text})} />
            <TextInput style={styles.input} placeholder="Телефон" placeholderTextColor={colors.gray} value={newUser.phone} onChangeText={text => setNewUser({...newUser, phone: text})} />
            <TextInput style={styles.input} placeholder="Пароль" placeholderTextColor={colors.gray} secureTextEntry value={newUser.password} onChangeText={text => setNewUser({...newUser, password: text})} />
            <View style={styles.roleSelect}>
              {['seller', 'admin', 'factory'].map(role => (
                <TouchableOpacity key={role} onPress={() => setNewUser({...newUser, role})} style={[styles.roleBtn, newUser.role === role && styles.roleActive]}>
                  <Text style={styles.roleText}>{role}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
              <Text style={styles.createBtnText}>Создать</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}
          ListEmptyComponent={<Text style={{ color: colors.gray, textAlign: 'center' }}>Нет пользователей</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.navyBlue, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' },
  cardContent: { flex: 1 },
  name: { color: colors.cream, fontSize: 18, fontWeight: 'bold' },
  phone: { color: colors.lightBlue, marginTop: 4 },
  role: { color: colors.gray, marginTop: 2 },
  blocked: { color: colors.warning, marginTop: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  blockBtn: { padding: 4 },
  deleteBtn: { padding: 4 },
  addButton: { backgroundColor: colors.lightBlue, padding: spacing.md, borderRadius: 12, alignItems: 'center', marginBottom: spacing.md },
  addButtonText: { color: colors.darkBlue, fontWeight: 'bold' },
  form: { backgroundColor: colors.navyBlue, padding: spacing.md, borderRadius: 12, marginBottom: spacing.md },
  input: { backgroundColor: colors.darkBlue, color: colors.cream, padding: spacing.sm, borderRadius: 8, marginBottom: spacing.sm },
  roleSelect: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.sm },
  roleBtn: { padding: spacing.sm, borderRadius: 8, backgroundColor: colors.darkBlue },
  roleActive: { backgroundColor: colors.lightBlue },
  roleText: { color: colors.cream },
  createBtn: { backgroundColor: colors.success, padding: spacing.sm, borderRadius: 8, alignItems: 'center' },
  createBtnText: { color: '#fff', fontWeight: 'bold' },
});
```

### 4.2 `src/screens/admin/AdminDebtsScreen.jsx`

```jsx
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getAllDebts, deleteDebt } from '../../api/admin';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDebtsScreen({ navigation }) {
  const [debts, setDebts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadDebts = async () => {
    try {
      const res = await getAllDebts();
      setDebts(res.data);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить долги');
    }
  };

  useFocusEffect(useCallback(() => { loadDebts(); }, []));

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDebts();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Подтверждение', 'Удалить долг?', [
      { text: 'Отмена' },
      { text: 'Удалить', onPress: async () => {
          try {
            await deleteDebt(id);
            loadDebts();
          } catch { Alert.alert('Ошибка', 'Не удалось удалить'); }
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.customer}>{item.customer}</Text>
        <Text style={styles.phone}>📞 {item.phone}</Text>
        <Text style={styles.seller}>Продавец: {item.seller}</Text>
        <Text style={styles.amount}>Сумма: {item.amount} ₽</Text>
        <Text style={styles.status}>Статус: {item.status === 'active' ? 'Активен' : 'Оплачен'}</Text>
        <Text style={styles.due}>Срок: {item.due_date}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Все долги системы" showBackButton onBackPress={() => navigation.goBack()} />
      <FlatList
        data={debts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}
        ListEmptyComponent={<Text style={{ color: colors.gray, textAlign: 'center' }}>Нет долгов</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.navyBlue, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' },
  cardContent: { flex: 1 },
  customer: { color: colors.cream, fontSize: 18, fontWeight: 'bold' },
  phone: { color: colors.lightBlue, marginTop: 4 },
  seller: { color: colors.gray, marginTop: 2 },
  amount: { color: colors.error, fontWeight: 'bold', marginTop: 4 },
  status: { color: colors.warning, marginTop: 2 },
  due: { color: colors.gray, marginTop: 2 },
  deleteBtn: { padding: 4, justifyContent: 'center' },
});
```

### 4.3 `src/screens/admin/AdminCustomersScreen.jsx`

Аналогично, но для клиентов.

```jsx
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getCustomers, deleteCustomer } from '../../api/admin';
import { Ionicons } from '@expo/vector-icons';

export default function AdminCustomersScreen({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить клиентов');
    }
  };

  useFocusEffect(useCallback(() => { loadCustomers(); }, []));

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomers();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Подтверждение', 'Удалить клиента? (Все его долги тоже удалятся)', [
      { text: 'Отмена' },
      { text: 'Удалить', onPress: async () => {
          try {
            await deleteCustomer(id);
            loadCustomers();
          } catch { Alert.alert('Ошибка', 'Не удалось удалить'); }
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>📞 {item.phone}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Клиенты" showBackButton onBackPress={() => navigation.goBack()} />
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}
        ListEmptyComponent={<Text style={{ color: colors.gray, textAlign: 'center' }}>Нет клиентов</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.navyBlue, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' },
  cardContent: { flex: 1 },
  name: { color: colors.cream, fontSize: 18, fontWeight: 'bold' },
  phone: { color: colors.lightBlue, marginTop: 4 },
  deleteBtn: { padding: 4, justifyContent: 'center' },
});
```

### 4.4 `src/screens/admin/AdminStatsScreen.jsx`

```jsx
import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getStats } from '../../api/admin';
import { StatCard } from '../../components/common/StatCard';

export default function AdminStatsScreen({ navigation }) {
  const [stats, setStats] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить статистику');
    }
  };

  useFocusEffect(useCallback(() => { loadStats(); }, []));

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  if (!stats) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.darkBlue, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.cream} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Статистика" showBackButton onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: spacing.md }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cream} />}>
        <View style={styles.row}>
          <StatCard value={stats.users} label="Пользователей" />
          <StatCard value={stats.customers} label="Клиентов" />
        </View>
        <View style={styles.row}>
          <StatCard value={stats.debts} label="Всего долгов" />
          <StatCard value={`${stats.total_debt} ₽`} label="Общая сумма долга" color={colors.error} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: spacing.md, gap: spacing.sm },
});
```

---

## 🔀 5. Добавляем меню навигации для администратора

Чтобы администратор мог переключаться между экранами, создадим простой таб-бар или используем боковое меню. Самый простой способ – добавить в каждый админ-экран список кнопок для перехода. Но лучше сделать отдельный `AdminHomeScreen` с меню.

Создайте `src/screens/admin/AdminHomeScreen.jsx`:

```jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export default function AdminHomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header title="Админ панель" rightButton={
        <TouchableOpacity onPress={logout}>
          <Text style={{ color: colors.error }}>Выйти</Text>
        </TouchableOpacity>
      } />
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AdminUsers')}>
          <Text style={styles.menuText}>👥 Пользователи</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AdminDebts')}>
          <Text style={styles.menuText}>💰 Все долги</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AdminCustomers')}>
          <Text style={styles.menuText}>📞 Клиенты</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AdminStats')}>
          <Text style={styles.menuText}>📊 Статистика</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.md },
  menuItem: { backgroundColor: colors.navyBlue, padding: spacing.lg, borderRadius: 16, width: '80%', alignItems: 'center' },
  menuText: { color: colors.cream, fontSize: 18, fontWeight: 'bold' },
});
```

И обновите `AppNavigator` для администратора, чтобы первым экраном был `AdminHomeScreen`:

```jsx
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
```

---

## ✅ Итог

- **Расширен `AuthContext`** для хранения роли.
- **Созданы API-функции** для всех админ-эндпоинтов.
- **Реализованы экраны**: пользователи, долги, клиенты, статистика, домашнее меню.
- **Навигация** разделена по ролям.

Теперь администратор может:
- Управлять пользователями (создание, удаление, блокировка).
- Просматривать и удалять любые долги.
- Управлять клиентами.
- Видеть общую статистику.

Если возникнут вопросы по интеграции или нужны доработки – обращайтесь!

- разделит или добавит экран сортировки активного долга и погашенных 

- добавит описание к долгам

- администратор скрытое или скрытая комбинация в окне входа добавления магазинов пуш увидомления  

- фабрики отделное окно с списком покупок 

- напоминания: программа может отправлять автоматические напоминания покупателю о предстоящих сроках погашения долгов.

- история платежей: программа сохраняет историю всех погашений долгов, что помогает покупателю отслеживать свои финансовые обязательства.

Также покупатели могут получать уведомления о специальных предложениях и скидках от магазина.
 функция чата с продавцом для быстрого решения вопросов и получения консультаций по товарам.
 
- отчёт 
- улутшит окно и процудуру входа 

- 2.3 Долги на сегодня (простые напоминания)

Без сложных уведомлений.

GET /debts?due_today=true

Показывает:

долги срок которых сегодня

- История платежей

Сейчас у тебя только статус. Нужно добавить:
таблица:
payments
id
debt_id
amount
date
Это позволит:
<!-- {частичное погашение} -->
видеть историю
-- 3.1 Чёрный список

Добавить:

customers.is_blacklisted

или отдельную таблицу.

API:

PUT /customers/:id/blacklist

Логика:

если клиент проблемный → помечаем
--Рейтинг должника

Автоматический расчёт:

количество долгов
просрочки
общая сумма

И вывод:

риск: высокий / средний / низкий
- редактировать имена ползователей и номара 
- улушит статистику например у рездилит ползователй что бы статистика была на ползователя 
sudo systemctl stop firewalld
npx expo start -c --lan
