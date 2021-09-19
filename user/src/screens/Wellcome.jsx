import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { Button } from "react-native-paper";
export default function Wellcome({ navigation }) {
  return (
    <View>
      <Header />

      <Button
        contentStyle={{ marginTop: 2, width: 50 }}
        mode="contained"
        color="blue"
        onPress={() => navigation.navigate("CreateOrder")}
      >
        Continue
      </Button>
    </View>
  );
}
