import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import convertToRupiah from "../helpers/toRupiah";
const windowWidth = Dimensions.get("window").width;
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { createOrder } from "../store/action";
const optionsPerPage = [2, 3, 4];
export default function Cart({ route, navigation }) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const dispatch = useDispatch();
  const { cartData } = route.params;
  const { services, access_token, loading } = useSelector(
    (state) => state.reducer
  );
  async function chechoutHander() {
    if (access_token == "") {
      Alert.alert("Checkout Error", "Please Login First!");
      navigation.navigate("Login");
    } else {
      const payload = {
        ServiceId: cartData.service.id,
        perfume: {
          id: cartData.perfume.id,
          price: cartData.perfume.price,
        },
        treatments: cartData.treatments,
        pickup: cartData.pickup,
      };
      let orderrs = await dispatch(createOrder(payload));
      if (orderrs === "success") {
        navigation.navigate("OrderCompleted");
      } else {
        Alert.alert("Checkout Error", `${orderrs}`);
      }
    }
  }

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <>
      <Card
        style={{
          width: windowWidth,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#1DB9C3",
          }}
        >
          <Title style={{ textAlign: "center" }}>{cartData.service.name}</Title>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Card.Cover
            style={{ width: 200, height: 200, marginTop: 5 }}
            source={{ uri: `${cartData.service.imageUrl}` }}
          />
        </View>
        <Card.Content>
          <View
            style={{
              marginTop: 10,
              backgroundColor: "#1DB9C3",
            }}
          >
            <Title style={{ textAlign: "center" }}>Perfume</Title>
          </View>
          <View style={{ alignItems: "center" }}>
            <Paragraph>{cartData.perfume.name}</Paragraph>
            <Image
              style={{ width: 80, height: 80, borderRadius: 20 }}
              source={{ uri: `${cartData.perfume.imageUrl}` }}
            />
            <Text>{convertToRupiah(+cartData.perfume.price)}</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              backgroundColor: "#1DB9C3",
            }}
          >
            <Title style={{ textAlign: "center" }}>Extra Order</Title>
          </View>
          <View style={{ flexDirection: "row" }}>
            {cartData.treatments.map((treat) => {
              return (
                <View key={treat.id}>
                  <View style={{ marginHorizontal: 10, alignItems: "center" }}>
                    <Paragraph>{treat.name}</Paragraph>
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 20 }}
                      source={{ uri: `${treat.imageUrl}` }}
                    />
                    <Text>
                      {convertToRupiah(+treat.price) + " x " + treat.qty}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Card.Content>
        <Card.Actions style={{ alignItems: "center" }}>
          <View
            style={{
              height: 30,
              backgroundColor: "#1DB9C3",
              width: windowWidth,
            }}
          >
            <Text>
              Total pesanan akan di hitung setelah konfirmasi dari admin
            </Text>
          </View>
        </Card.Actions>
      </Card>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          bottom: 3,
          position: "absolute",
        }}
      >
        <Button
          labelStyle={{ fontSize: 20, textAlign: "center" }}
          style={{
            width: windowWidth,
            height: 50,
            borderRadius: 0,
          }}
          mode="contained"
          onPress={() => chechoutHander()}
        >
          Checkout
        </Button>
      </View>
    </>
  );
}
