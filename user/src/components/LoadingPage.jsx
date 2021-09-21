import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View, Dimensions } from "react-native";
const heightWindow = Dimensions.get("window").height;
const widthWindow = Dimensions.get("window").width;
export function Loading() {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        style={{
          width: widthWindow * 0.5,
          height: heightWindow * 0.5,
        }}
        source={require("../img/loading_page.json")}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
}

export function Uploading() {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        duration={3000}
        style={{
          width: widthWindow * 0.3,
          height: heightWindow * 0.3,
        }}
        source={require("../img/uploading_page.json")}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
}

export function DataNotFound() {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        duration={3000}
        style={{
          width: widthWindow * 0.3,
          height: heightWindow * 0.3,
        }}
        source={require("../img/data_notfound.json")}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
