import React, { useEffect } from "react";
// source={{
//     uri: "https://image.winudf.com/v2/image1/Y29tLkFsRmFqckRldmVsb3Blci5CbHVlLldhbGxwYXBlcl9zY3JlZW5fMTBfMTU2MDcyMzcyNV8wNjk/screen-7.jpg?fakeurl=1&type=.jpg",
//   }}
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Create Order");
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.background}>
      <Image style={styles.logo} source={require("../img/EZ_Laundr.png")} />
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
  logo: {
    width: 222,
    height: 105,
  },
});
