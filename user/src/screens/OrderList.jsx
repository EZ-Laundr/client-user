import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/action";
import {
  Chip,
  DataTable,
  Button,
  Card,
  Title,
  Badge,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import convertToRupiah from "../helpers/toRupiah";
import getDirections from "react-native-google-maps-directions";
import * as Location from "expo-location";
const windowWidth = Dimensions.get("window").width;
export default function OrderList({ navigation }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [latToko, setLatToko] = useState(-5.370346);
  const [longToko, setLongToko] = useState(105.051187);
  const { orders, perfumes, treatments, access_token, loading } = useSelector(
    (state) => state.reducer
  );
  React.useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync({
        accuracy: 6,
      });
      setLocation(location);
    })();
  }, []);

  function handleDirection() {
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
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  }

  if (orders) {
    return (
      <ScrollView>
        <View>
          {orders.map((order) => {
            return (
              <Card
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
                  Pesanan Tanggal 19 September 2021
                </Badge>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Title>{order.Service.name}</Title>
                    <Card.Cover
                      style={{ width: 120, height: 120, marginTop: 10 }}
                      source={{ uri: `${order.Service.imageUrl}` }}
                    />
                  </View>
                  <View style={{ marginTop: 50 }}>
                    <Text>{order.Perfume.name}</Text>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: `${order.Perfume.imageUrl}` }}
                    />
                    <View>
                      <View style={{ marginTop: 20, flexDirection: "row" }}>
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
                          onPress={() =>
                            navigation.navigate("Midtrans", { order: order })
                          }
                        >
                          Bayar
                        </Chip>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    );

    // return (
    //   <>
    //     {/* <ScrollView horizontal={true}> */}
    //     <DataTable>
    //       <DataTable.Header>
    //         <DataTable.Title>Order Id</DataTable.Title>
    //         <DataTable.Title>Service</DataTable.Title>
    //         <DataTable.Title>Status</DataTable.Title>
    //         <DataTable.Title>Total Price</DataTable.Title>
    //         <DataTable.Title>Action</DataTable.Title>
    //       </DataTable.Header>
    //       {orders.map((order) => {
    //         return (
    //           <DataTable.Row key={order.id}>
    //             <DataTable.Cell>{order.id}</DataTable.Cell>
    //             <DataTable.Cell>service</DataTable.Cell>
    //             <DataTable.Cell>{order.status}</DataTable.Cell>
    //             <DataTable.Cell>
    //               {convertToRupiah(order.totalPrice)}
    //             </DataTable.Cell>
    //             <DataTable.Cell>
    //               <Chip
    //                 style={{
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   backgroundColor: "#3DB2FF",
    //                   borderRadius: 10,
    //                   justifyContent: "space-evenly",
    //                 }}
    //                 onPress={() =>
    //                   navigation.navigate("Midtrans", { order: order })
    //                 }
    //               >
    //                 Bayar
    //               </Chip>
    //               <Chip
    //                 style={{
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   backgroundColor: "#3DB2FF",
    //                   borderRadius: 10,
    //                   justifyContent: "space-evenly",
    //                 }}
    //                 onPress={() =>
    //                   navigation.navigate("Order Detail", { orderId: order.id })
    //                 }
    //               >
    //                 Detail
    //               </Chip>
    //             </DataTable.Cell>
    //           </DataTable.Row>
    //         );
    //       })}
    //     </DataTable>
    //     <View
    //       style={{
    //         alignItems: "center",
    //         justifyContent: "center",
    //         bottom: 3,
    //         position: "absolute",
    //       }}
    //     >
    //       <Button
    //         labelStyle={{ fontSize: 20, textAlign: "center" }}
    //         style={{
    //           width: windowWidth,
    //           height: 50,
    //           borderRadius: 0,
    //         }}
    //         mode="contained"
    //         onPress={() => handleDirection()}
    //       >
    //         Antar Pakaian
    //       </Button>
    //     </View>
    //     {/* </ScrollView> */}
    //   </>
    // );
  } else {
    return <Text> Loading...</Text>;
  }
}
