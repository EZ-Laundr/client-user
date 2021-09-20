import React, { useState } from "react";
import { StyleSheet, Text, Alert, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { loginUser } from "../store/action";
export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailHandler(email) {
    setEmail(email);
  }

  function passwordHandler(pwd) {
    setPassword(pwd);
  }

  async function loginHandler() {
    // try {
    //   if (email === "") {
    //     Alert.alert("Email kosong", "Silahkan isi email & pasword");
    //   } else if (password === "") {
    //     Alert.alert("Password kosong", "Silahkan isi email & pasword");
    //   } else {
    const payload = {
      email: email,
      password: password,
    };
    const goLogin = await dispatch(loginUser(payload));

    if (goLogin === "success") {
      navigation.navigate("Home");
    } else {
      // Alert.alert("Login Failed", `${goLogin.join("\n")}`);
      Alert.alert("Login Failed");
    }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <>
      <Header />
      <TextInput
        mode="outlined"
        label="Email"
        left={<TextInput.Icon name="email" />}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        theme="accent"
        mode="outlined"
        label="Password"
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
        right={<TextInput.Icon name="eye" />}
        onChangeText={(value) => passwordHandler(value)}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Button
          labelStyle={{ fontSize: 20, textAlign: "center" }}
          style={{ width: 200, height: 50 }}
          mode="contained"
          onPress={() => loginHandler()}
        >
          Login
        </Button>
      </View>
    </>
  );
}
