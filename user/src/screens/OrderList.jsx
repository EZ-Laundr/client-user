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
  Card,
  Title,
  Badge,
  Modal,
  Portal,
} from "react-native-paper";

import convertToRupiah from "../helpers/toRupiah";
import getDirections from "react-native-google-maps-directions";
import * as Location from "expo-location";
import convertDate from "../helpers/formatDate";
import { DataNotFound } from "../components/LoadingPage";
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

  useEffect(() => {
    dispatch(fetchOrders());
    getLocation();
  }, []);

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
    dispatch(fetchQrCode(`edit/${orderId}`));
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

  if (orders.length < 1) {
    return (
      <ScrollView
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {orders.map((order) => {
            return (
              <Card
                key={order.id}
                style={{
                  width: windowWidth,
                  height: 180,
                  margin: 5,
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
                  <View>
                    <Title>{order.Service.name}</Title>
                    <Card.Cover
                      style={{ width: 120, height: 120, marginTop: 10 }}
                      source={{ uri: `${order.Service.imageUrl}` }}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Text>{order.Perfume.name}</Text>
                    <Image
                      style={{ width: 45, height: 45 }}
                      source={{ uri: `${order.Perfume.imageUrl}` }}
                    />

                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <ScrollView horizontal={true}>
                        {order.OrderSpecials.map((treat) => {
                          return (
                            <View
                              key={treat.id}
                              style={{ marginHorizontal: 3 }}
                            >
                              <Text>
                                {treat.SpecialTreatment.name} x {treat.quantity}
                              </Text>
                              <Image
                                style={{ width: 35, height: 35 }}
                                source={{
                                  uri: `${treat.SpecialTreatment.imageUrl}`,
                                }}
                              />
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      position: "absolute",
                      bottom: 50,
                      right: 0,
                    }}
                  >
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
                        marginRight: 5,
                      }}
                      mode="contained"
                      onPress={() => handleShowStatus(order.id)}
                    >
                      Status
                    </Chip>

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
                        marginRight: 5,
                      }}
                      mode="contained"
                      onPress={() => handleDirection()}
                    >
                      Antar
                    </Chip>
                    <View>
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
                        onPress={() => paymentHandler(order)}
                      >
                        Bayar
                      </Chip>
                    </View>
                  </View>
                </View>
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
                <Text>Order ID : {detailOrder.id}</Text>
                <View>
                  <Image
                    style={styles.codeImage}
                    source={{ uri: `${qrCode.qrcode}` }}
                  />
                </View>
                <Text>Nama Pesanan : {detailOrder.Service.name}</Text>
                <Text>Status Pesanan : {detailOrder.status}</Text>
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
