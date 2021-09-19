import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
export default function OrderCompleted() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://media.istockphoto.com/vectors/approval-symbol-check-mark-in-a-circle-drawn-by-hand-vector-green-ok-vector-id1094780808?b=1&k=20&m=1094780808&s=170667a&w=0&h=stB0rAfwOPwAOTM4iO2YP02Dh8ZsfhqYR_Eu4zCv06s=",
        }}
      />
      <Text style={{ fontSize: 40 }}>Selamat!!!</Text>
      <Text style={{ fontSize: 20 }}>Pesanan kamu telah kami terima</Text>
      <Text style={{ fontSize: 20 }}>Silahkan tunggu konfirmasi dari kami</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 200,
  },
});
