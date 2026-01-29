import { Text, View, TextInput, Button, StyleSheet} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Меню админа</Text>
      <Button title="Список магазинов" onPress={() => {}} />
      <Button title="Чорный список" onPress={() => {}} />
      <Button title="Новости" onPress={() => {}} />
      <Button title="Экстренные сообщения" onPress={() => {}} />
      <Button title="Запросы продавцов" onPress={() => {}} />      
    </View>
  );
}   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // color: "#ffffff",
    fontSize: 24,
    marginBottom: 20,
  }
});

