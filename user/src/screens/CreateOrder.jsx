import * as React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

import {
  Card,
  IconButton,
  Title,
  Divider,
  TouchableRipple,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../store/action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import convertToRupiah from "../helpers/toRupiah";
import { useFonts } from "expo-font";
import CarouselItem from "../components/CarouselItem";

const CreateOrder = ({ navigation }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(0);
  const [selected, setSelected] = React.useState(false);
  const { services, loading } = useSelector((state) => state.reducer);

  React.useEffect(() => {
    dispatch(fetchServices());
  }, []);

  function treatHandler(treat) {
    setTreatForAdd(treat);
    showModal();
  }

  function incrementHandler() {
    setQuantity(quantity + 1);
  }

  function decrementHandler() {
    setQuantity(quantity - 1);
  }

  function selectHandler(service) {
    setSelected(service.id);
    navigation.navigate("Cart", { service });
  }

  let [fontsLoaded] = useFonts({
    Eczar: require("../assets/Eczar/Eczar-SemiBold.ttf"),
    Poppins2: require("../assets/Poppins/Poppins-ExtraLightItalic.ttf"),
    Poppins: require("../assets/Poppins/Poppins-ExtraLightItalic.ttf"),
  });

  if (fontsLoaded) {
    return (
      <>
        <View style={{ backgroundColor: "white" }}>
          <Title
            style={{
              fontFamily: "Eczar",
              fontSize: 24,
              paddingTop: windowHeight * 0.02,
              marginTop: windowHeight * 0.02,
              marginLeft: 15,
            }}
          >
            Layanan Kami
          </Title>
          <Divider />
        </View>
        <View style={styles.container}>
          {services.map((service, index) => {
            return (
              <TouchableRipple
                onPress={() => selectHandler(service)}
                rippleColor="rgba(0, 0, 255, 0.2)"
                key={service.id}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 6,
                }}
              >
                <Card
                  style={
                    selected === service.id
                      ? styles.selected
                      : styles.unSelected
                  }
                >
                  <View>
                    <Card.Cover
                      style={styles.content}
                      source={{ uri: `${service.imageUrl}` }}
                    />
                    {selected === service.id && (
                      <IconButton
                        style={{
                          position: "absolute",
                        }}
                        icon="check-circle"
                        color="#3DB2FF"
                        size={25}
                      />
                    )}

                    <View>
                      <Text
                        style={{
                          fontFamily: "Eczar",
                          fontSize: 20,
                        }}
                      >
                        {service.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins2",
                          fontSize: 14,
                        }}
                      >
                        {convertToRupiah(service.price)} / Kg
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableRipple>
            );
          })}
        </View>
      </>
    );
  } else {
    return <Text>Loading...</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
  },

  selected: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.29,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#3DB2FF",
  },
  unSelected: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.29,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 15,
  },
  content: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.2,
    marginTop: 5,
    borderRadius: 15,
  },
});

export default CreateOrder;
