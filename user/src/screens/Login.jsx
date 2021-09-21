import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import CarouselItem from "../components/CarouselItem";
import Header from "../components/Header";
import { Loading } from "../components/LoadingPage";
import { loginUser, setLoading } from "../store/action";
export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.reducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  }, [navigation]);

  function emailHandler(email) {
    setEmail(email);
  }

  function passwordHandler(pwd) {
    setPassword(pwd);
  }

  async function loginHandler() {
    try {
      if (email === "") {
        Alert.alert("Email kosong", "Silahkan isi email & pasword");
      } else if (password === "") {
        Alert.alert("Password kosong", "Silahkan isi email & pasword");
      } else {
        const payload = {
          email: email,
          password: password,
        };
        const goLogin = await dispatch(loginUser(payload));

        if (goLogin === "success") {
          dispatch(setLoading(true));
          navigation.navigate("Ez Loundr");
        } else {
          // Alert.alert("Login Failed", `${goLogin.join("\n")}`);
          Alert.alert("Login Failed");
        }
      }
    } catch (error) {
      Alert.alert("Login Failed");
    }
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: "#F9F8EB" }}>
        <CarouselItem />
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
            color="#3DB2FF"
            labelStyle={{ fontSize: 20, textAlign: "center", color: "white" }}
            style={{ width: 200, height: 50 }}
            mode="contained"
            onPress={() => loginHandler()}
          >
            Login
          </Button>
          <Text style={{ margin: 10 }}>Didn't have account ?</Text>
          <Button
            color="#3DB2FF"
            labelStyle={{ fontSize: 20, textAlign: "center", color: "white" }}
            style={{ width: 200, height: 50 }}
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Button>
        </View>
      </ScrollView>
    );
  }
}
