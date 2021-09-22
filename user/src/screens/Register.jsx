import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Platform,
  Alert,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { registerUser } from "../store/action";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
//------------------------------------------------------------
import registerForPushNotificationsAsync from "../helpers/registerForPushNotificationsAsync";
//-------------------------------------------------------------

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  async function registerHandler() {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token>>>>>>", token);
        // setNotificationToken(token)
        const payload = {
          phoneNumber,
          email,
          password,
          notificationToken: token,
        };
        console.log(payload);
        return dispatch(registerUser(payload));
      })
      .then((goRegister) => {
        if (goRegister === "success") {
          navigation.navigate("Ez Loundr");
        } else {
          Alert.alert("Register Failed", `${goRegister.join("\n")}`);
        }
      });
  }

//   async function registerForPushNotificationsAsync() {
//     let token;
//     if (Constants.isDevice) {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         return;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       //   console.log(token);
//     } else {
//       alert("Must use physical device for Push Notifications");
//     }

//     if (Platform.OS === "android") {
//       Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     return token;
//   }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  // ---------------------------------------------------------------
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://cutewallpaper.org/21/mobile-app-background/Gradient-Huawei-wallpapers-Oneplus-wallpapers-Samsung-.jpg",
        }}
        style={styles.image}
      >
        <View style={{ alignItems: "center" }}>
          <ImageBackground
            style={styles.imageHeader}
            source={require("../img/head4_white.png")}
          >
            {/* <View>
              <Image
                source={require("../img/EZ_Laundr.png")}
                style={styles.logo}
              />
            </View> */}
          </ImageBackground>
        </View>
        <ScrollView>
          <Card
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.4)",
            }}
          >
            <Title style={{ textAlign: "center", color: "white" }}>
              Create Your Account
            </Title>
            <Card.Content>
              <TextInput
                theme="accent"
                mode="outlined"
                label="Full Name"
                secureTextEntry
                left={<TextInput.Icon name="account" />}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <TextInput
                mode="outlined"
                label="Birth Date"
                disabled={true}
                left={<TextInput.Icon name="calendar" />}
                onPress={(e) => setShow(true)}
              />
              <TextInput
                mode="outlined"
                label="Email"
                left={<TextInput.Icon name="email" />}
                onChangeText={(value) => setEmail(value)}
              />
              <TextInput
                theme="accent"
                mode="outlined"
                label="Password"
                secureTextEntry
                left={<TextInput.Icon name="lock" />}
                right={<TextInput.Icon name="eye" />}
                onChangeText={(value) => setPassword(value)}
              />
              <TextInput
                theme="accent"
                mode="outlined"
                label="Phone Number"
                left={<TextInput.Icon name="phone" />}
                onChangeText={(value) => setPhoneNumber(value)}
              />
              <TextInput
                theme="accent"
                mode="outlined"
                label="Address"
                secureTextEntry
                left={<TextInput.Icon name="home-city" />}
              />
            </Card.Content>
            <Card.Actions
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Button
                color="#3DB2FF"
                labelStyle={{
                  fontSize: 20,
                  textAlign: "center",
                  color: "white",
                }}
                style={{ width: 150, height: 45 }}
                mode="contained"
                onPress={() => registerHandler()}
              >
                Register
              </Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  imageHeader: {
    width: windowWidth,
    height: 200,
  },
  logo: {
    width: 180,
    height: 100,
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(52, 52, 52, 0)",
    // backgroundColor: "white",
  },
});
