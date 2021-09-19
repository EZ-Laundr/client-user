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
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { useDispatch } from "react-redux";
import { createOrder } from "../store/action";
const optionsPerPage = [2, 3, 4];
export default function Cart({ route, navigation }) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const dispatch = useDispatch();
  const { cartData } = route.params;

  async function chechoutHander() {
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
      console.log("ada error di create order");
    }
  }

  function convertToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      "Rp. " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  }
  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <>
      <Card>
        <Card.Title title={cartData.service.name} />
        <Card.Cover source={{ uri: `${cartData.service.imageUrl}` }} />
        <Card.Content>
          <View>
            <Title>With perfume</Title>
            <Paragraph>{cartData.perfume.name}</Paragraph>
            <View>
              <Image
                style={{ width: 80, height: 80, borderRadius: 20 }}
                source={{ uri: `${cartData.perfume.imageUrl}` }}
              />
              <Text>{convertToRupiah(+cartData.perfume.price)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {cartData.treatments.map((treat) => {
              return (
                <View>
                  <Paragraph>{treat.title}</Paragraph>
                  <View>
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 20 }}
                      source={{ uri: `${treat.imageUrl}` }}
                    />
                    <Text>{convertToRupiah(+cartData.perfume.price)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Card.Content>
        <Card.Actions></Card.Actions>
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
            height: 40,
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
