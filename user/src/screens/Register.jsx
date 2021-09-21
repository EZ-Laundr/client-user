import React, { useState } from "react";
import { StyleSheet, Text, Alert, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { registerUser } from "../store/action";
import { ScrollView } from "react-native-gesture-handler";


export default function Register({navigation}) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    async function registerHandler() {
        const payload = {
            phoneNumber,
            email,
            password,
          };
          const goRegister = await dispatch(registerUser(payload));
  
          if (goRegister === "success") {
            navigation.navigate("Home");
          } else {
            Alert.alert("Register Failed", `${goRegister.join('\n')}`);
          }
    }

    return (
        <ScrollView style={{ backgroundColor: "#F9F8EB" }}>
          {/* <Header /> */}
          <TextInput
            mode="outlined"
            label="Email"
            left={<TextInput.Icon name="email" />}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            theme="accent"
            mode="outlined"
            label="Phone Number"
            left={<TextInput.Icon name="phone" />}
            onChangeText={(value) => setPhoneNumber(value)}
          />
          <TextInput
            theme="accent"
            mode="outlined"
            label="Password"
            secureTextEntry
            left={<TextInput.Icon name="lock" />}
            right={<TextInput.Icon name="eye" />}
            onChangeText={(value) => setPassword(value)}
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
        </ScrollView>
      );
    }
