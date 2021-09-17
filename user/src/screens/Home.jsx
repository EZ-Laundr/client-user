import React from "react";
import { Dimensions, Text, View, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import CardService from "../components/CardService";
import { SafeAreaView } from "react-native-safe-area-context";
const height = Dimensions.get("window").height;
import { Card, ListItem, Button, Icon } from "react-native-elements";
const services = [
  {
    title: "Cuci Aja",
    image:
      "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
  },
  {
    title: "Cuci Setrika",
    image:
      "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
  },
  {
    title: "Setrika Aja",
    image:
      "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
  },
  {
    title: "Apalagi?",
    image:
      "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
  },
];
export default function Home({ navigation }) {
  return (
    <View>
      <View style={tw`p-4 android:pt-72 bg-blue-500 flex-row`}>
        <Text style={tw`font-medium tracking-wide`}>Hello World</Text>
      </View>

      <ScrollView horizontal={true}>
        <View style={{ flexDirection: "row" }}>
          {services.map((service) => {
            return (
              <>
                <CardService service={service} navigation={navigation} />
              </>
            );
          })}
        </View>
      </ScrollView>
      <Button
        title="Custom Orders"
        onPress={() => navigation.navigate("CreateOrder")}
      />
      <View style={tw`mt-2`}>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}
