import React, { useState, useEffect, useRef } from "react";
import { Text, View, Platform, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { registerUser } from "../store/action";
import { ScrollView } from "react-native-gesture-handler";

//------------------------------------------------------------
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
//-------------------------------------------------------------

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
//   const [notificationToken, setNotificationToken] = useState('')

    async function registerHandler() {
        console.log(1);
        registerForPushNotificationsAsync()
        .then(token => {
            console.log('token>>>>>>',token);
            // setNotificationToken(token)
            const payload = {
                phoneNumber,
                email,
                password,
                notificationToken: token
            };
            console.log(payload);
            return dispatch(registerUser(payload));
        })
        .then((goRegister)=>{
            if (goRegister === "success") {
                navigation.navigate("Ez Loundr");
            } else {
              Alert.alert("Register Failed", `${goRegister.join('\n')}`);
            }
        })
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
        //   console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }
    
    // ---------------------------------------------------------------
    return (
        <ScrollView style={{ backgroundColor: "#F9F8EB" }}>
          {/* <Header /> */}
          <TextInput
            mode="outlined"
            label="Email"
            left={<TextInput.Icon name="email" />}
            onChangeText={(value) => setEmail(value)}
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
            label="Password"
            secureTextEntry
            left={<TextInput.Icon name="lock" />}
            right={<TextInput.Icon name="eye" />}
            onChangeText={(value) => setPassword(value)}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button
              labelStyle={{ fontSize: 20, textAlign: "center" }}
              style={{ width: 200, height: 50 }}
              mode="contained"
              onPress={() => registerHandler()}
            >
              Register
            </Button>
          </View>
        </ScrollView>
      )


}
