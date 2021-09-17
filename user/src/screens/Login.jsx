import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import { Input } from "react-native-elements";
import { Card, ListItem, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
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
    try {
      console.log(email, "email di login");
      if (email === "") {
        console.log("email is required");
      } else if (password === "") {
        console.log("password is required");
      } else {
        const payload = {
          email: email,
          password: password,
        };
        const goLogin = await dispatch(loginUser(payload));
        if (goLogin === "success") {
          console.log(goLogin);
          navigation.navigate("Home");
        } else {
          console.log(goLogin, "else");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View style={tw`p-4 android:pt-72 bg-blue-500 flex-row`}>
        <Text style={tw`font-medium tracking-wide`}>Hello World</Text>
        <Text>{email}</Text>
      </View>

      <Input
        placeholder="Your@mail.com"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        onChangeText={(value) => emailHandler(value)}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        secureTextEntry={true}
        onChangeText={(value) => passwordHandler(value)}
      />

      <Button title="Login" onPress={() => loginHandler()} />
    </>
  );
}
