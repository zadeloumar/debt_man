import { Text, View, TextInput, Button, StyleSheet, } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.hed1}>Вход</Text>
      <TextInput id="id_log" placeholder="Enter your id" style={styles.input} />
      <TextInput id="id_pass" placeholder="Enter password" style={styles.input} />
      <Button title="Login" onPress={() => router.push("./src/screens/admin/AdminMenu")} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e2e2e",
  },
  hed1: {
    color: "#ffffff",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#4e4e4e",
    borderColor: "#ffffff",
    borderWidth: 1,
    color: "#ffffff",
    width: "80%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});