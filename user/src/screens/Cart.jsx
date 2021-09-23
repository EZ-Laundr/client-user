import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import convertToRupiah from "../helpers/toRupiah";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Chip,
  TouchableRipple,
  Portal,
  Modal,
  Switch,
  Badge,
  Divider,
} from "react-native-paper";
import {
  createOrder,
  fetchParfume,
  fetchTreatment,
  setLoading,
} from "../store/action";
import { Uploading } from "../components/LoadingPage";

export default function Cart({ route, navigation }) {
  const dispatch = useDispatch();
  const { service } = route.params;
  const [perfumeSelected, setSelectPerfume] = React.useState({});
  const [quantity, setQuantity] = React.useState(0);
  const [addTreat, setAddTreat] = React.useState(0);
  const [treatForAdd, setTreatForAdd] = React.useState([]);
  const [selected, setSelected] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [pickup, setPickup] = React.useState(false);
  const [deliveryStatus, setDelivery] = React.useState(false);
  const [forEdit, setForEdit] = React.useState(0);
  const { perfumes, treatments, access_token, loading } = useSelector(
    (state) => state.reducer
  );

  useEffect(() => {
    dispatch(setLoading(false));
    dispatch(fetchParfume());
    dispatch(fetchTreatment());
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function addTreatmentHandler(treatment) {
    setAddTreat(treatment.id);
  }

  const onToggleSwitch = () => setPickup(!pickup);

  function selectHandler(perfume) {
    setSelectPerfume(perfume);
  }

  function addTreatHandler(treatment) {
    let newTreat = {
      id: treatment.id,
      name: treatment.name,
      qty: quantity,
      price: treatment.price,
      imageUrl: treatment.imageUrl,
    };

    console.log("emang masuk?");
    const findDuplicate = treatForAdd.find((el) => el.id === treatment.id);

    if (!findDuplicate) {
      setTreatForAdd([...treatForAdd, newTreat]);
    } else {
      const filterDuplicate = treatForAdd.filter(
        (el) => el.id !== treatment.id
      );
      setTreatForAdd([...filterDuplicate, newTreat]);
    }
    setQuantity(0);

    setAddTreat(0);
    console.log(treatForAdd);
  }

  function incrementTreatAdded(treatNew) {
    const searchTreat = treatForAdd.filter((el) => {
      if (el.id === treatNew.id) {
        el.qty += 1;
      }
      return "oke";
    });
    console.log(treatForAdd);
    console.log("masuk");
  }

  function decrementTreatAdded(treatNew) {
    const searchTreat = treatForAdd.filter((el) => {
      if (el.id === treatNew.id) {
        el.qty -= 1;
      }
      return "oke";
    });

    console.log("masuk");
  }

  function incrementHandler(e) {
    e.preventDefault();
    setQuantity(quantity + 1);
    console.log("jalan");
  }

  function decrementHandler(e) {
    e.preventDefault();
    setQuantity(quantity - 1);
  }

  async function checkoutHander() {
    if (access_token == "") {
      Alert.alert("Checkout Error", "Please Login First!");
      navigation.navigate("Login");
    } else {
      if (pickup) {
        const cartData = {
          ServiceId: service.id,
          perfume: {
            id: perfumeSelected.id,
            price: perfumeSelected.price,
          },
          treatments: treatForAdd,
          pickup: pickup,
        };
        hideModal();
        navigation.navigate("Map", { cartData });
      } else {
        const payload = {
          ServiceId: service.id,
          perfume: {
            id: perfumeSelected.id,
            price: perfumeSelected.price,
          },
          treatments: treatForAdd,
          pickup: pickup,
        };
        const uploadOrder = await dispatch(createOrder(payload));
        if (uploadOrder === "success") {
          hideModal();
          navigation.navigate("Order Completed");
        } else {
          Alert.alert("Checkout Error", `${uploadOrder}`);
        }
      }
    }
  }
  if (loading) {
    return <Uploading />;
  } else {
    return (
      <>
        {console.log(treatForAdd, "<<<<<<<<cek>>>>>")}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyleModal}
          >
            <View>
              <Title>Rincian Pesanan</Title>
            </View>
            <View>
              <Card
                style={{
                  width: windowWidth * 0.98,
                  marginVertical: 5,
                  height: windowHeight * 0.5,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 10,
                      backgroundColor: "#E6E6E6",
                    }}
                  >
                    <Text>{service.name}</Text>
                    <Card.Cover
                      style={{
                        width: windowWidth * 0.4,
                        height: windowHeight * 0.23,
                        borderRadius: 15,
                        resizeMode: "contain",
                      }}
                      source={{ uri: `${service.imageUrl}` }}
                    />
                    <Text>{convertToRupiah(service.price)} / Kg</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginTop: 100,
                      marginLeft: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 10,
                      backgroundColor: "#E6E6E6",
                    }}
                  >
                    <Text>{perfumeSelected.name}</Text>
                    <Card.Cover
                      style={{
                        width: windowWidth * 0.15,
                        height: windowHeight * 0.08,
                        borderRadius: 15,
                        resizeMode: "contain",
                      }}
                      source={{ uri: `${perfumeSelected.imageUrl}` }}
                    />
                    {/* <Text>{convertToRupiah(perfumeSelected.price)}</Text> */}
                  </View>
                </View>

                <Divider />
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={{
                    height: windowHeight * 0.15,
                    marginTop: 15,
                  }}
                >
                  {treatForAdd.map((treat) => {
                    return (
                      <View
                        key={treat.id}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginHorizontal: 5,
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            zIndex: 50,
                            right: 0,
                            top: 0,
                          }}
                        >
                          <Badge>{treat.qty}</Badge>
                        </View>
                        <Text>{treat.name}</Text>
                        <Card.Cover
                          style={{
                            width: windowWidth * 0.2,
                            height: windowHeight * 0.09,
                            borderRadius: 15,
                            resizeMode: "contain",
                          }}
                          source={{ uri: `${treat.imageUrl}` }}
                        />
                        <Text>{convertToRupiah(treat.price)}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </Card>
            </View>

            <View style={{ marginTop: 10, alignItems: "center" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text> Pengiriman Pakaian:</Text>
                  <Switch value={pickup} onValueChange={onToggleSwitch} />
                </View>
              </View>
              <Text style={{ width: windowWidth * 0.98, textAlign: "center" }}>
                Total pembayaran akan di informasikan setelah pemesanan di
                proses oleh admin
              </Text>
              <Button
                labelStyle={{
                  fontSize: 17,
                  textAlign: "center",
                  marginTop: 10,
                }}
                style={{
                  width: 200,
                  height: 50,
                  borderRadius: 10,
                  marginTop: 10,
                  backgroundColor: "#107CF1",
                }}
                mode="contained"
                onPress={() => checkoutHander()}
              >
                Submit Pesanan
              </Button>
            </View>
          </Modal>
        </Portal>
        <View style={styles.cart}>
          <Title
            style={{
              color: "black",
              // textShadowColor: "rgba(0,0,0, 0.5)",
              // textShadowOffset: { width: -1, height: 1 },
              // textShadowRadius: 10,
            }}
          >
            Pilihan Perfume
          </Title>
          <View
            style={{
              width: windowWidth,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {perfumes.map((perfume) => {
              return (
                <TouchableRipple
                  onPress={() => selectHandler(perfume)}
                  rippleColor="rgba(0, 0, 255, 0.2)"
                  key={perfume.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    style={
                      perfumeSelected.id === perfume.id
                        ? styles.selectedPerfume
                        : styles.unSelectedPerfume
                    }
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: windowWidth * 0.18,
                          height: windowHeight * 0.1,
                          borderRadius: 15,
                          resizeMode: "contain",
                        }}
                        source={{ uri: `${perfume.imageUrl}` }}
                      />
                      <Text>{perfume.name}</Text>
                    </View>
                  </Card>
                </TouchableRipple>
              );
            })}
          </View>
        </View>

        <View style={[styles.container, { marginTop: 15 }]}>
          <Title style={{ textAlign: "center", height: 50, color: "white" }}>
            Extra Order
          </Title>

          <ScrollView>
            {treatments.map((treat) => {
              return (
                <Card key={treat.id} style={styles.cardPerfume}>
                  <View style={styles.contentCard}>
                    <View
                      style={{
                        marginHorizontal: 10,
                      }}
                    >
                      <Image
                        style={styles.content}
                        source={{ uri: `${treat.imageUrl}` }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                      >
                        {treat.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                        }}
                      >
                        {convertToRupiah(treat.price)}.00
                      </Text>
                    </View>

                    <View
                      style={{
                        position: "absolute",
                        right: 15,
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <View>
                          {addTreat === treat.id ? (
                            <View
                              style={{
                                alignItems: "center",
                                marginTop: 16,
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <IconButton
                                  icon="minus"
                                  color="blue"
                                  size={20}
                                  disabled={quantity == 0 ? true : false}
                                  onPress={(e) => decrementHandler(e)}
                                />
                                <TextInput
                                  style={{
                                    backgroundColor: "#C8C6C6",
                                    width: 30,
                                    height: 30,
                                    borderRadius: 5,
                                    textAlign: "center",
                                    marginTop: 8,
                                  }}
                                  value={quantity.toString()}
                                  keyboardType="numeric"
                                />
                                <IconButton
                                  icon="plus"
                                  color="blue"
                                  size={20}
                                  onPress={(e) => incrementHandler(e)}
                                />
                              </View>
                              <Chip
                                textStyle={{ fontSize: 15 }}
                                style={styles.chipUnselect}
                                mode="contained"
                                onPress={(e) => addTreatHandler(treat)}
                              >
                                Oke
                              </Chip>
                            </View>
                          ) : (
                            <View>
                              <Chip
                                textStyle={{ fontSize: 15 }}
                                style={styles.chipUnselect}
                                mode="contained"
                                onPress={(e) => addTreatmentHandler(treat)}
                              >
                                Add
                              </Chip>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 7,
            width: windowWidth,
            alignItems: "center",
          }}
        >
          <Button
            labelStyle={{ fontSize: 20, textAlign: "center" }}
            style={{
              width: windowWidth * 0.4,
              height: windowHeight * 0.06,
              borderRadius: 20,
              backgroundColor: "#107CF1",
              // borderWidth: 3,
              // borderColor: "#107CF1",
            }}
            mode="contained"
            onPress={() => showModal()}
          >
            checkout
          </Button>
        </View>
      </>
    );
  }
}

//buttom plus minus

// <View
// style={{
//   position: "absolute",
//   right: 15,
//   flexDirection: "row",
// }}
// >
// <IconButton
//   icon="plus-circle"
//   color="#3DB2FF"
//   size={30}
//   onPress={() => console.log("Pressed")}
// />
// <IconButton
//   icon="minus-circle"
//   color="#3DB2FF"
//   size={30}
//   onPress={() => console.log("Pressed")}
// />
// </View>

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#107CF1",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  cart: {
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    borderRadius: 15,
    resizeMode: "contain",
    marginTop: 20,
  },
  containerStyleModal: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
  },
  selectedPerfume: {
    width: windowWidth * 0.22,
    marginVertical: 5,
    height: windowHeight * 0.13,
    marginHorizontal: 5,
    backgroundColor: "#3DB2FF",
  },
  unSelectedPerfume: {
    width: windowWidth * 0.22,
    marginVertical: 5,
    height: windowHeight * 0.13,
    marginHorizontal: 5,
    // backgroundColor: "#3DB2FF",
  },
  contentCard: {
    flexDirection: "row",
    width: windowWidth,
    alignItems: "center",
  },
  cardPerfume: {
    width: windowWidth * 0.98,
    height: windowHeight * 0.15,
    borderRadius: 15,
    marginVertical: 5,
  },
  chipSelected: {
    width: windowWidth * 0.2,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3DB2FF",
    borderRadius: 10,
    marginRight: 5,
  },
  chipUnselect: {
    width: windowWidth * 0.2,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#107CF1",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    marginRight: 5,
  },
});
