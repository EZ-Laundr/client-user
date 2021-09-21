import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Alert,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import CarouselItem from "../components/CarouselItem";
import Header from "../components/Header";
import { Loading } from "../components/LoadingPage";
import { loginUser, setLoading } from "../store/action";
export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.reducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  }, []);

  function emailHandler(email) {
    setEmail(email);
  }

  function passwordHandler(pwd) {
    setPassword(pwd);
  }

  async function loginHandler() {
    try {
      if (email === "") {
        Alert.alert("Email kosong", "Silahkan isi email & pasword");
      } else if (password === "") {
        Alert.alert("Password kosong", "Silahkan isi email & pasword");
      } else {
        const payload = {
          email: email,
          password: password,
        };
        const goLogin = await dispatch(loginUser(payload));

        if (goLogin === "success") {
          dispatch(setLoading(true));
          navigation.navigate("Ez Loundr");
        } else {
          // Alert.alert("Login Failed", `${goLogin.join("\n")}`);
          Alert.alert("Login Failed");
        }
      }
    } catch (error) {
      Alert.alert("Login Failed");
    }
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://cutewallpaper.org/21/mobile-app-background/Gradient-Huawei-wallpapers-Oneplus-wallpapers-Samsung-.jpg",
          }}
          style={styles.image}
        >
          <View>
            <ImageBackground
              style={styles.imageHeader}
              source={require("../img/head3-removebg-preview.png")}
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
              <Card.Cover
                style={styles.logo}

                source={require("../img/head4_white.png")}
              />
              <Card.Title />
              <Card.Content>
                <Title>Sign In</Title>
                <Paragraph>Sign in with your account</Paragraph>
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
                  onChangeText={(value) => passwordHandler(value)}
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
                  onPress={() => loginHandler()}
                >
                  Login
                </Button>
              </Card.Actions>
            </Card>
            <Text style={{ margin: 10 }}>Didn't have account ?</Text>

            <Button
              color="#3DB2FF"
              labelStyle={{
                fontSize: 20,
                textAlign: "center",
                color: "white",
              }}
              style={{ width: 150, height: 45 }}
              mode="contained"
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Button>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
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
    height: 300,
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
