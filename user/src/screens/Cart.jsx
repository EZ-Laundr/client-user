import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";

export default function Cart({ route, navigation }) {
  const { servicesSelected, parumeSelected, treatmentSelected, delivery } =
    route.params;

  return (
    <>
      <View style={tw`p-4 android:pt-24 bg-blue-500 flex-row`}>
        <Text style={tw`font-medium text-4xl tracking-wide`}>Cart</Text>
      </View>
      <View>
        <ScrollView>
          <View
            style={{
              height: 60,
              flexDirection: "row",
              flex: 1,
              padding: 2,
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Name</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Total Price</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Quantity</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "red" }}>Remove</Text>
            </View>
          </View>
          <View style={{ padding: 8 }}>
            <View
              style={{
                height: 90,
                flexDirection: "row",
                flex: 1,
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image style={{ width: 75, height: 75 }} source="" />
                <Text style={{ color: "black" }}>nama item</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>apa ya</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  underlineColorAndroid="transparent"
                  style={{ textAlign: "center", fontSize: 16 }}
                  keyboardType="numeric"
                  value={servicesSelected}
                  editable={false}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></View>
            </View>
          </View>
          );
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 80,
              height: 60,
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>ya gatau</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>apasi</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
