import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import CardService from "../components/CardService";
import { SafeAreaView } from "react-native-safe-area-context";
const height = Dimensions.get("window").height;
import { Card, ListItem, Button, Icon } from "react-native-elements";

export default function Home({ navigation }) {
  return (
    <View>
      <View style={tw`p-4 android:pt-10 bg-blue-500 flex-row`}>
        <Text style={tw`font-medium tracking-wide`}>Hello World</Text>
      </View>

      <ScrollView>
        <Card>
          <CardService navigation={navigation} />
        </Card>
        <View>
          <Button
            title="Custom Orders"
            onPress={() => navigation.navigate("CreateOrder")}
          />
        </View>
        <View style={tw`mt-2`}>
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
        </View>
      </ScrollView>
    </View>
  );
}
