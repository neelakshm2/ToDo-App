import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import ToDo from "./components/ToDo";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "Buy Coffee", key: "1" },
    { text: "Create An App", key: "2" },
    { text: "Play on the Switch", key: "3" },
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS !!", "ToDos must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  return (
    //<Sandbox />

    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("Dismissed Keyboard");
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Form submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <ToDo item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
