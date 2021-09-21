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
