import React, { useEffect } from "react";
import { Dimensions, Text, View, ScrollView, Alert } from "react-native";
import CardService from "../components/CardService";
import { SafeAreaView } from "react-native-safe-area-context";
const height = Dimensions.get("window").height;
import { useDispatch, useSelector } from "react-redux";
import { Button, FAB, Portal, Provider } from "react-native-paper";
import CarouselItem from "../components/CarouselItem";
import {
  fetchParfume,
  fetchServices,
  fetchTreatment,
  setToken,
} from "../store/action";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { services, perfumes, treatments, access_token, loading } = useSelector(
    (state) => state.reducer
  );
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchParfume());
    dispatch(fetchTreatment());
  }, []);

  function createOrderHandler() {
    if (access_token == "") {
      Alert.alert("Login Status", "Kamu harus login dulu", [
        {
          text: "Login",
          onPress: () => {
            navigation.navigate("Login");
          },
          style: "ok",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else {
      navigation.navigate("Create Order");
    }
  }

  function logoutHandler() {
    dispatch(setToken(""));
    Alert.alert("Logout Sukses", "Kamu berhasil logout!");
  }

  if (services) {
    return (
      <>
        <Provider>
          <View style={{ flex: 1, backgroundColor: "#1EAFED" }}>
            <View style={{ height: height * 0.45 }}>
              <CarouselItem />
            </View>
            <ScrollView>
              <View>
                <View style={{ marginTop: 20 }}>
                  <Text>Services</Text>
                </View>
                <ScrollView horizontal={true}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {services.map((service, index) => {
                      return (
                        <View key={index}>
                          <CardService
                            service={service}
                            navigation={navigation}
                          />
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              <View>
                <View style={{ marginTop: 20 }}>
                  <Text>Perfumes</Text>
                </View>
                <ScrollView horizontal={true}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {perfumes.map((service, index) => {
                      return (
                        <View key={index}>
                          <CardService
                            service={service}
                            navigation={navigation}
                          />
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              <View>
                <View style={{ marginTop: 20 }}>
                  <Text>Ekstra Order</Text>
                </View>
                <ScrollView horizontal={true}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {treatments.map((service, index) => {
                      return (
                        <View key={index}>
                          <CardService
                            service={service}
                            navigation={navigation}
                          />
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
          <Portal>
            {access_token == "" ? (
              <FAB.Group
                fabStyle={{ backgroundColor: "#3DB2FF" }}
                color="#FFFF"
                style={{ zIndex: 50 }}
                open={open}
                icon={open ? "basket-outline" : "plus"}
                actions={[
                  {
                    icon: "login",
                    label: "Login",
                    onPress: () => navigation.navigate("Login"),
                    small: false,
                  },
                  {
                    icon: "chat",
                    label: "Chat Admin",
                    onPress: () => createOrderHandler(),
                    small: false,
                  },
                  {
                    icon: "washing-machine",
                    label: "Pesan Laundry",
                    onPress: () => createOrderHandler(),
                    small: false,
                  },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                  if (open) {
                    // do something if the speed dial is open
                  }
                }}
              />
            ) : (
              <FAB.Group
                fabStyle={{ backgroundColor: "#3DB2FF" }}
                color="#FFFF"
                style={{ zIndex: 50 }}
                open={open}
                icon={open ? "basket-outline" : "plus"}
                actions={[
                  {
                    icon: "logout",
                    label: "Logout",
                    onPress: () => logoutHandler(),
                    small: false,
                  },
                  {
                    icon: "chat",
                    label: "Chat Admin",
                    onPress: () => createOrderHandler(),
                    small: false,
                  },
                  {
                    icon: "washing-machine",
                    label: "Pesan Laundry",
                    onPress: () => createOrderHandler(),
                    small: false,
                  },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                  if (open) {
                    // do something if the speed dial is open
                  }
                }}
              />
            )}
          </Portal>
        </Provider>
      </>
    );
  }
}
