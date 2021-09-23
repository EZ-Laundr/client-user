import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail, fetchOrders, fetchQrCode } from "../store/action";
import {
  Chip,
  DataTable,
  Button,
  Title,
  Badge,
  Modal,
  Portal,
  Card,
} from "react-native-paper";
import convertToRupiah from "../helpers/toRupiah";
import getDirections from "react-native-google-maps-directions";
import * as Location from "expo-location";
import convertDate from "../helpers/formatDate";
import { DataNotFound } from "../components/LoadingPage";
import { useFocusEffect } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function OrderList({ navigation }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [latToko, setLatToko] = useState(-5.370346);
  const [longToko, setLongToko] = useState(105.051187);
  const {
    orders,
    detailOrder,
    qrCode,
    perfumes,
    treatments,
    access_token,
    loading,
  } = useSelector((state) => state.reducer);
  const [refreshing, setRefreshing] = React.useState(false);
  const [visibleStatus, setStatusVisible] = React.useState(false);

  const showStatus = () => setStatusVisible(true);
  const hideStatus = () => setStatusVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchOrders());
      getLocation();
    }, [])
  );
  // useEffect(() => {
  //   dispatch(fetchOrders());
  //   getLocation();
  // }, []);

  async function getLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getLastKnownPositionAsync({
        accuracy: 6,
      });
      setLocation(location);
    } catch (error) {
      console.log(error);
    }
  }

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchOrders());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function paymentHandler(order) {
    console.log("====>", order, "handler");
    Alert.alert("Bayar Pesanan", "Bayar pesanan sekarang?", [
      {
        text: "Ngga",
        style: "ok",
      },
      {
        text: "Bayar",
        style: "cancel",
        onPress: () => {
          navigation.navigate("Midtrans", { order: order });
        },
      },
    ]);
  }

  function handleShowStatus(orderId) {
    dispatch(fetchQrCode(`/detail/${orderId}`));
    dispatch(fetchOrderDetail(orderId));
    showStatus();
  }

  function handleDirection() {
    Alert.alert("Antar Pesanan", "Antar pesanan sekarang?", [
      {
        text: "Nanti",
        style: "ok",
      },
      {
        text: "Antar Sekarang",
        style: "cancel",
        onPress: () => {
          const data = {
            source: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            destination: {
              latitude: latToko,
              longitude: longToko,
            },
            params: [
              {
                key: "travelmode",
                value: "driving",
              },
              {
                key: "dir_action",
                value: "navigate",
              },
            ],
          };
          getDirections(data);
        },
      },
    ]);
  }

  if (orders.length < 1 || access_token == "") {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DataNotFound />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView
        style={{ backgroundColor: "#BDD3EF" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingTop: 6 }}>
          {orders.map((order) => {
            return (
              <Card
                key={order.id}
                style={{
                  width: windowWidth,
                  height: 200,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  marginVertical: 6,
                }}
              >
                <Badge
                  size={25}
                  style={{
                    position: "absolute",
                    zIndex: 50,
                    borderRadius: 0,
                    color: "gray",
                    fontStyle: "italic",
                    backgroundColor: "white",
                  }}
                >
                  {convertDate(order.createdAt)}
                </Badge>

                <View style={{ flexDirection: "row" }}>
                  <View style={{}}>
                    <Text style={{ fontWeight: "bold" }}>
                      {order.codeTransaction}
                    </Text>

                    <Card.Cover
                      style={{ width: 110, height: 110, marginTop: 10 }}
                      source={{ uri: `${order.Service.imageUrl}` }}
                    />

                    <Text
                      style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        marginTop: 15,
                      }}
                    >
                      {order.status}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ marginTop: 20, marginLeft: 15 }}>
                      <Title>{order.Service.name}</Title>

                      <View style={{ flexDirection: "row" }}>
                        <Title style={{ fontWeight: "bold" }}>
                          {convertToRupiah(order.totalPrice)}
                        </Title>

                        {order.statusPayment === true ? (
                          <Text
                            style={{
                              textAlignVertical: "center",
                              marginLeft: 10,
                              fontStyle: "italic",
                            }}
                          >
                            Paid
                          </Text>
                        ) : (
                          <Text
                            style={{
                              textAlignVertical: "center",
                              marginLeft: 10,
                              fontStyle: "italic",
                            }}
                          >
                            Unpaid
                          </Text>
                        )}
                      </View>

                      <View style={{ flexDirection: "row", marginTop: 12 }}>
                        <Image
                          style={{ width: 40, height: 40 }}
                          source={{ uri: `${order.Perfume.imageUrl}` }}
                        />
                        <Text
                          style={{ textAlignVertical: "center", marginLeft: 5 }}
                        >
                          {order.Perfume.name}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "column", marginTop: 26 }}>
                      <ScrollView vertical={true}>
                        {order.OrderSpecials.map((treat) => {
                          return (
                            <View
                              key={treat.id}
                              // style={{ marginHorizontal: 3 }}
                            >
                              <Text>
                                {treat.quantity} {treat.SpecialTreatment.name}
                              </Text>
                              {/* <Image
                                                            style={{ width: 35, height: 35 }}
                                                            source={{
                                                            uri: `${treat.SpecialTreatment.imageUrl}`,
                                                            }}
                                                        /> */}
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </View>
                {order.status === "Done" ? (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                    }}
                  >
                    <Text style={{ fontStyle: "italic" }}>Pesanan Selesai</Text>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        position: "absolute",
                        bottom: -8,
                        right: -10,
                        flexDirection: "row",
                      }}
                    >
                      <Chip
                        labelStyle={{ fontSize: 10 }}
                        textStyle={{ color: "white", fontSize: 15 }}
                        style={{
                          width: 100,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#107CF1",
                          borderRadius: 0,
                          justifyContent: "space-evenly",
                          marginRight: 10,
                        }}
                        mode="contained"
                        onPress={() => handleShowStatus(order.id)}
                      >
                        QR Code
                      </Chip>

                      <Chip
                        labelStyle={{ fontSize: 10 }}
                        textStyle={{ color: "white", fontSize: 15 }}
                        style={{
                          width: 100,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#107CF1",
                          borderRadius: 0,
                          justifyContent: "space-evenly",
                          marginRight: 5,
                        }}
                        mode="contained"
                        onPress={() => handleDirection()}
                      >
                        Lokasi
                      </Chip>

                      {order.status == "On Progress" &&
                        order.statusPayment == false && (
                          <View>
                            <Chip
                              labelStyle={{ fontSize: 10 }}
                              textStyle={{ color: "white", fontSize: 15 }}
                              style={{
                                width: 100,
                                height: 30,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#107CF1",
                                borderRadius: 0,
                                justifyContent: "space-evenly",
                              }}
                              mode="contained"
                              onPress={() => paymentHandler(order)}
                            >
                              Bayar
                            </Chip>
                          </View>
                        )}
                    </View>
                  </View>
                )}
              </Card>
            );
          })}
        </View>
        <Portal>
          {detailOrder?.Service && (
            <Modal
              visible={visibleStatus}
              onDismiss={hideStatus}
              contentContainerStyle={styles.containerStyleModal}
            >
              <View>
                {/* <Text>Order ID : {detailOrder.codeTransaction}</Text> */}
                <View>
                  <Image
                    style={styles.codeImage}
                    source={{ uri: `${qrCode.qrcode}` }}
                  />
                </View>
                {/* <Text>Nama Pesanan : {detailOrder.Service.name}</Text> */}
                {/* <Text>Status Pesanan : {detailOrder.status}</Text> */}
                {/* {detailOrder.statusPayment == true ? (
                  <Text>Status Pembayaran : Selesai</Text>
                ) : (
                  <Text>Status Pembayaran : Pending</Text>
                )} */}

                {/* <Text>Total Harga : {detailOrder.totalPrice}</Text> */}
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  labelStyle={{
                    fontSize: 15,
                    textAlign: "center",
                    marginTop: 5,
                  }}
                  style={{ width: 80, height: 30, borderRadius: 10 }}
                  mode="contained"
                  onPress={() => hideStatus()}
                >
                  Oke
                </Button>
              </View>
            </Modal>
          )}
        </Portal>
      </ScrollView>
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
  containerStyleModal: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    textAlign: "center",
  },
});
