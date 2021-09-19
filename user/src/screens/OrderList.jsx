import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/action";
import { Chip, DataTable } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import convertToRupiah from "../helpers/toRupiah";

export default function OrderList() {
  const dispatch = useDispatch();

  const { orders, perfumes, treatments, access_token, loading } = useSelector(
    (state) => state.reducer
  );
  React.useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (orders) {
    return (
      <>
        {/* <ScrollView horizontal={true}> */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Order Id</DataTable.Title>
            <DataTable.Title>Service</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Total Price</DataTable.Title>
            <DataTable.Title>Action</DataTable.Title>
          </DataTable.Header>

          {orders.map((order) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>{order.id}</DataTable.Cell>
                <DataTable.Cell>service</DataTable.Cell>
                <DataTable.Cell>{order.status}</DataTable.Cell>
                <DataTable.Cell>
                  {convertToRupiah(order.totalPrice)}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Chip
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#3DB2FF",
                      borderRadius: 10,
                      justifyContent: "space-evenly",
                    }}
                    onPress={() => console.log("Pressed")}
                  >
                    Detail
                  </Chip>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
        {/* </ScrollView> */}
      </>
    );
  }
}
