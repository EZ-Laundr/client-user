import React, { useEffect } from "react";
import { Dimensions, Text, View, ScrollView } from "react-native";
import CardService from "../components/CardService";
import { SafeAreaView } from "react-native-safe-area-context";
const height = Dimensions.get("window").height;
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-native-paper";
import Header from "../components/Header";
import CarouselItem from "../components/CarouselItem";
import { fetchServices } from "../store/action";
export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { services, access_token, loading } = useSelector(
    (state) => state.reducer
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, []);



  return (
    <>
      <CarouselItem />
      <Button labelStyle={{ fontSize: 10 }}
              style={{ width: 100, height: 30 }}
              mode="contained"
              onPress={() => navigation.navigate("Register")}></Button>
      <View>
        <View style={{ marginTop: 20 }}>
          <Text>Selamat Datang</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {services.map((service, index) => {
            return (
                <CardService
                  service={service}
                  key={"services"+index}
                  navigation={navigation}
                />
            );
          })}
        </View>
      </View>
    </>
  );

}
