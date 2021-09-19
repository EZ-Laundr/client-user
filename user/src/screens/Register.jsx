import React, { useState } from "react";
import { StyleSheet, Text, Alert, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { registerUser } from "../store/action";

export default function Register({navigation}) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerHandler() {
        // if (!email) {
        // Alert.alert("Email kosong", "Silahkan isi email & pasword");
        // }
        // if (!password) {
        // Alert.alert("Password kosong", "Silahkan isi email & pasword");
        // }

        const payload = {
            email,
            password,
          };
          const goRegister = await dispatch(registerUser(payload));
  
          if (goRegister === "success") {
            navigation.navigate("Home");
          } else {
            Alert.alert("Login Failed", `${goRegister.join('\n')}`);
          }
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
              onPress={() => registerHandler()}
            >
              Register
            </Button>
          </View>
        </>
      );
    }
