import React, { useEffect } from "react";
import { Dimensions, Text, View, ScrollView } from "react-native";
import CardService from "../components/CardService";
import { SafeAreaView } from "react-native-safe-area-context";
const height = Dimensions.get("window").height;
import { useDispatch, useSelector } from "react-redux";
import { Button, FAB, Portal, Provider } from "react-native-paper";
import Header from "../components/Header";
import CarouselItem from "../components/CarouselItem";
import { fetchServices } from "../store/action";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { services, access_token, loading } = useSelector(
    (state) => state.reducer
  );
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    dispatch(fetchServices());
  }, []);


  function createOrderHandler() {
    if (access_token == "") {
      console.log(access_token);
      navigation.navigate("Login");
    } else {
      navigation.navigate("CreateOrder");
    }
  }

  if (services) {
    return (
      <>
        <Provider>

        
          <CarouselItem />
          
          <Button
              labelStyle={{ fontSize: 20, textAlign: "center" }}
              style={{ width: 200, height: 50 }}
              mode="contained"
              onPress={() => navigation.navigate("Register")}
            >
  Register
            </Button>

          <View>
            <View style={{ marginTop: 20 }}>
              <Text>Selamat Datang</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {services.map((service, index) => {
                return (
                  <View key={index}>
                    <CardService service={service} navigation={navigation} />
                  </View>
                );
              })}
            </View>
          </View>
          <Portal>
            <FAB.Group
              fabStyle={{ backgroundColor: "#3DB2FF" }}
              color="#FFFF"
              style={{ zIndex: 50 }}
              open={open}
              icon={open ? "basket-outline" : "plus"}
              actions={[
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
          </Portal>
        </Provider>
      </>
    );
  }
}
