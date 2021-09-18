import React, { useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
export default function Header() {
  return (
    <View>
      <View style={styles.page}>
        <ImageBackground
          style={styles.header}
          source={require("../img/Header.png")}
        ></ImageBackground>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: windowHeight * 0.37,
  },
  header: {
    height: windowHeight * 0.32,
    width: windowWidth,
  },
  logo: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.06,
  },
});
