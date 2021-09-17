import React from "react";
import { Dimensions, Text, View, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
export default function CardService({ service, navigation }) {
  return (
    <>
      <View style={{ alignItems: "center" }}>
        <Card containerStyle={tw`w-40 h-44`}>
          <Card.Title>{service.title}</Card.Title>
          <Card.Image
            containerStyle={tw`w-32 h-20`}
            source={{
              uri: `${service.image}`,
            }}
          ></Card.Image>

          <Button
            buttonStyle={tw`w-20 h-6 mt-2`}
            icon={<Icon name="arrow-right" size={15} color="white" />}
            title="Take"
            onPress={() => navigation.navigate("CreateOrder")}
          />
        </Card>
      </View>
    </>
  );
}
