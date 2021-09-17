import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import { Input } from "react-native-elements";
import { Card, ListItem, Button } from "react-native-elements";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler(value) {
    setEmail(value);
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
        onChangeText={(value) => loginHandler(value)}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        secureTextEntry={true}
      />

      <Button title="Login" onPress={() => navigation.navigate("Home")} />
    </>
  );
}
