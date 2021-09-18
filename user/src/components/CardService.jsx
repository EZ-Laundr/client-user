import React from "react";
import { Dimensions, Text, View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import { useDispatch, useSelector } from "react-redux";
export default function CardService({ service, navigation }) {
  const { services, access_token, loading } = useSelector(
    (state) => state.reducer
  );

  function createOrderHandler() {
    if (access_token == "") {
      console.log(access_token);
      navigation.navigate("Login");
    } else {
      navigation.navigate("CreateOrder");
    }
  }

  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Card
          style={{ width: 180, height: 180, margin: 5, alignItems: "center" }}
        >
          <Card.Cover
            style={{ width: 120, height: 120, marginTop: 10 }}
            source={{ uri: `${service.image}` }}
          />
          <Card.Actions>
            <Button
              labelStyle={{ fontSize: 10 }}
              style={{ width: 100, height: 30 }}
              mode="contained"
              onPress={() => createOrderHandler()}
            >
              {service.title}
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </>
  );
}
