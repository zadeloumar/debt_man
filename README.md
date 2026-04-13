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

- разделит или добавит экран сортировки активного долга и погашенных 

- добавит описание к долгам

- напоминания: программа может отправлять автоматические напоминания покупателю о предстоящих сроках погашения долгов.

- история платежей: программа сохраняет историю всех погашений долгов, что помогает покупателю отслеживать свои финансовые обязательства.

Также покупатели могут получать уведомления о специальных предложениях и скидках от магазина.
 функция чата с продавцом для быстрого решения вопросов и получения консультаций по товарам.
 
