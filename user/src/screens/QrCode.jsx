import React from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail, fetchQrCode } from "../store/action";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Modal,
  Portal,
} from "react-native-paper";
import convertToRupiah from "../helpers/toRupiah";
const windowWidth = Dimensions.get("window").width;
export default function QrCode({ route }) {
  const dispatch = useDispatch();
  const {
    detailOrder,
    qrCode,
    orders,
    perfumes,
    treatments,
    access_token,
    loading,
  } = useSelector((state) => state.reducer);
  const { orderId } = route.params;
  const [visible, setVisible] = React.useState(false);
  const [visibleStatus, setStatusVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showStatus = () => setStatusVisible(true);
  const hideStatus = () => setStatusVisible(false);
  React.useEffect(() => {
    dispatch(fetchQrCode(`edit/${orderId}`));
    dispatch(fetchOrderDetail(orderId));
  }, []);

  const containerStyleModal = {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    textAlign: "center",
  };

  if (detailOrder?.Service) {
    return (
      <>
        <Card>
          <View
            style={{
              marginTop: 10,
              backgroundColor: "#1DB9C3",
            }}
          >
            <Title style={{ textAlign: "center" }}>
              {detailOrder.Service.name}
            </Title>
          </View>

          <Card.Cover
            style={{ width: 150, height: 150, alignSelf: "center" }}
            source={{ uri: `${detailOrder.Service.imageUrl}` }}
          />
          <Card.Content>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#1DB9C3",
              }}
            >
              <Title style={{ textAlign: "center" }}>With perfume</Title>
            </View>
            <View style={{ alignItems: "center" }}>
              <Paragraph>{detailOrder.Perfume.name}</Paragraph>
              <Image
                style={{ width: 80, height: 80, borderRadius: 20 }}
                source={{ uri: `${detailOrder.Perfume.imageUrl}` }}
              />
              <Text>{convertToRupiah(+detailOrder.Perfume.price)}</Text>
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
              {detailOrder.OrderSpecials.map((treat) => {
                return (
                  <View
                    key={treat.id}
                    style={{ marginHorizontal: 10, alignItems: "center" }}
                  >
                    <Paragraph>{treat.SpecialTreatment.name}</Paragraph>
                    <View>
                      <Image
                        style={{ width: 80, height: 80, borderRadius: 20 }}
                        source={{ uri: `${treat.SpecialTreatment.imageUrl}` }}
                      />
                      <Text>
                        {convertToRupiah(+treat.price) + " x " + treat.quantity}
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
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Total pesanan : {convertToRupiah(detailOrder.totalPrice)}
              </Text>
            </View>
          </Card.Actions>
        </Card>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            flex: 1,
            bottom: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            labelStyle={{ fontSize: 15, textAlign: "center" }}
            style={{
              width: windowWidth * 0.5,
              height: 40,
              borderRadius: 10,
              marginRight: 3,
            }}
            mode="contained"
            onPress={() => showStatus()}
          >
            Status Order
          </Button>
          <Button
            labelStyle={{ fontSize: 15, textAlign: "center" }}
            style={{
              width: windowWidth * 0.5,
              height: 40,
              borderRadius: 10,
              marginLeft: 3,
            }}
            mode="contained"
            onPress={() => showModal()}
          >
            QR Code
          </Button>
        </View>
      </>
    );
  } else {
    return (
      <View style={styles.background}>
        <Text>{JSON.stringify(detailOrder)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  codeImage: {
    width: 200,
    height: 200,
  },
});
