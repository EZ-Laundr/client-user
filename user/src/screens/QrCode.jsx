import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail, fetchQrCode } from "../store/action";

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

  React.useEffect(() => {
    dispatch(fetchQrCode(`edit/${orderId}`));
    dispatch(fetchOrderDetail(orderId));
  }, []);

  return (
    <View style={styles.background}>
      <Image style={styles.codeImage} source={{ uri: `${qrCode.qrcode}` }} />
      {/* <Text>{JSON.stringify(detailOrder)}</Text> */}
    </View>
  );
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
