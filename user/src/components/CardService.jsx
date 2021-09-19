import React from "react";
import { Dimensions, Text, View, Image } from "react-native";
import { Avatar, Button, Card, Title, Chip } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import { useDispatch, useSelector } from "react-redux";
export default function CardService({ service, navigation }) {
  const { services, access_token, loading } = useSelector(
    (state) => state.reducer
  );

  return (
    <View>
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
            source={{ uri: `${service.imageUrl}` }}
          />
          <Card.Actions>
            <Chip
              labelStyle={{ fontSize: 10 }}
              style={{
                width: 100,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#3DB2FF",
                borderRadius: 0,
                justifyContent: "space-evenly",
              }}
              mode="contained"
            >
              {service.name}
            </Chip>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
}
