import React from "react";
import { Dimensions, Text, View, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
export default function CardService({ navigation }) {
  const users = [
    {
      name: "brynn",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
    },
  ];
  return (
    <>
      <Card.Title>TITLE</Card.Title>
      <Card.Image
        source={{
          uri: "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
        }}
      ></Card.Image>
      <Text style={{ marginBottom: 10 }}>
        The idea with React Native Elements is more about component structure
        than actual design.
      </Text>
      <Button
        title="Get Service"
        onPress={() => navigation.navigate("CreateOrder")}
      />
    </>
  );
}
