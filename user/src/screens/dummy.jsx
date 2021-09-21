import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
export default function Dummy() {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#eee",
        }}
        source={require("../img/loading_page.json")}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

//>>>> Array [
//   Object {
//     "category": "Extra Order",
//     "id": 1,
//     "merchant_name": "Ez_Loundr",
//     "name": "Handuk",
//     "price": 10000,
//     "quantity": 2,
//   },
//   Object {
//     "category": "Extra Order",
//     "id": 2,
//     "merchant_name": "Ez_Loundr",
//     "name": "Sprei",
//     "price": 16000,
//     "quantity": 4,
//   },
//   Object {
//     "category": "Extra Order",
//     "id": 3,
//     "merchant_name": "Ez_Loundr",
//     "name": "Selimut",
//     "price": 7000,
//     "quantity": 1,
//   },
//   Object {
//     "category": "Extra Order",
//     "id": 5,
//     "merchant_name": "Ez_Loundr",
//     "name": "Jas",
//     "price": 50000,
//     "quantity": 5,
//   },
//   Object {
//     "category": "Extra Order",
//     "id": 6,
//     "merchant_name": "Ez_Loundr",
//     "name": "Karpet",
//     "price": 20000,
//     "quantity": 1,
//   },
//   Object {
//     "category": "Extra Order",
//     "id": 4,
//     "merchant_name": "Ez_Loundr",
//     "name": "Gorden",
//     "price": 12000,
//     "quantity": 2,
//   },
//   Object {
//     "category": "Service",
//     "id": 2,
//     "merchant_name": "Ez_Loundr",
//     "name": "Cuci Setrika",
//     "price": 10000,
//     "quantity": 1,
//     "weight": 0,
//   },
//   Object {
//     "category": "Perfume",
//     "id": 2,
//     "merchant_name": "Ez_Loundr",
//     "name": "Ocean Fresh",
//     "price": 2000,
//     "quantity": 1,
//   },
// ] <<<<<<<<
