import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
// import RnIncrementDecrementBtn from "react-native-increment-decrement-button";
import {
  Chip,
  Modal,
  Card,
  Portal,
  IconButton,
  Colors,
  TextInput,
  Button,
  Badge,
} from "react-native-paper";
import { DraxProvider, DraxScrollView, DraxView } from "react-native-drax";
import { useDispatch, useSelector } from "react-redux";
import { fetchParfume, fetchServices, fetchTreatment } from "../store/action";
import Map from "./Map";
const windowWidth = Dimensions.get("window").width;
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import convertToRupiah from "../helpers/toRupiah";
const CreateOrder = ({ navigation }) => {
  const dispatch = useDispatch();
  const [received, setReceived] = React.useState([]);
  const [quantity, setQuantity] = React.useState(0);
  const [staged, setStaged] = React.useState([]);
  const [serviceDragged, setServDrag] = React.useState(false);
  const [parfumeDragged, setParfDrag] = React.useState(false);
  const [delivery, setDelivery] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [mapVisible, setVisibleMap] = React.useState(false);
  const [treatForSend, setTreatForSend] = React.useState([]);

  //cuma buat di modal
  const [treatForAdd, setTreatForAdd] = React.useState({});

  //yg di tampilin
  const [treatReceived, setTreatReceived] = React.useState([]);
  const [serviceReceived, setServiceReceived] = React.useState(null);
  const [perfumeReceived, setPerfumeReceived] = React.useState(null);

  const [editQty, setEditQty] = React.useState(false);

  const [location, setLocation] = React.useState(null);

  const { services, perfumes, treatments, access_token, loading } = useSelector(
    (state) => state.reducer
  );
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showMap = () => setVisibleMap(true);
  const hideMap = () => setVisibleMap(false);

  React.useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchParfume());
    dispatch(fetchTreatment());
  }, []);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync({
        accuracy: 6,
      });
      setLocation(location);
    })();
  }, []);

  const containerStyleModal = {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    textAlign: "center",
  };

  function submitExtraHandler(treatAdd) {
    if (quantity == 0) {
      Alert.alert("Jumlah harus di isi", "Anda belum memasukkan jumlah barang");
    } else {
      //jika jumlah lebih dari 0 maka di cek edit apa engga
      let newTreat = {
        id: treatAdd.id,
        name: treatAdd.name,
        qty: quantity,
        price: treatAdd.price,
        imageUrl: treatAdd.imageUrl,
      };
      if (editQty === true) {
        let newTreatForEdit = treatReceived.filter(
          (el) => el.id !== treatAdd.id
        );
        setTreatReceived([...newTreatForEdit, newTreat]);
        setEditQty(false);
        setQuantity(0);
      } else {
        let treatFinder = treatReceived.filter((el) => el.id === treatAdd.id);
        if (treatFinder.length > 0) {
          Alert.alert("Item anda sudah ada", "Silahkan edit / hapus");
          setQuantity(0);
        } else {
          setTreatReceived([...treatReceived, newTreat]);
          setQuantity(0);
        }
      }
    }
    // setTreatForSend([...treatForSend, newTreat]);

    hideModal();
  }

  function deleteOrder(ident, id) {
    if (ident === "treat") {
      const newReceived = treatReceived.filter((el) => el.id !== id);
      setTreatReceived(newReceived);
    } else if (ident == "service") {
      setServiceReceived(null);
    } else if (ident == "parfume") {
      console.log("masuk");
      setPerfumeReceived(null);
    } else {
      setPerfumeReceived(null);
      setServiceReceived(null);
      setTreatReceived(null);
    }
  }

  function editQtyHandler(id) {
    const newPayload = treatReceived.find((el) => el.id === id);
    setTreatForAdd(newPayload);
    setEditQty(true);
    setQuantity(newPayload.qty);
    showModal();
  }

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

  function chechoutHander() {
    let payloadCart;
    let cartData;
    if (!serviceReceived && !perfumeReceived && treatReceived.length < 1) {
      Alert.alert("Pesanan Kosong", "Kamu belum memilih pesanan");
    } else {
      Alert.alert("Anter apa jemput?", "Mau nganter apa di jemput nih?", [
        {
          text: "Anter Aja",
          onPress: () => {
            setDelivery(false),
              Alert.alert("Di anter yaa?", "lanjut checkout kuy?", [
                {
                  text: "GAS!",
                  onPress: () => {
                    // console.log(service);
                    cartData = {
                      service: serviceReceived,
                      perfume: perfumeReceived,
                      treatments: treatReceived,
                      pickup: delivery,
                    };
                    console.log(cartData, "cardata");
                    navigation.navigate("Cart", { cartData });
                  },
                  style: "cancel",
                },
                {
                  text: "Ga jadi",
                  onPress: () => {
                    setDelivery(true), console.log(delivery, "deliv");
                  },
                },
              ]);
          },
          style: "cancel",
        },
        {
          text: "Di Jemput Dong",
          onPress: () => {
            setDelivery(true),
              Alert.alert(
                "Okeey dijemput",
                "PIlih dulu tempat penjemputannya",
                [
                  {
                    text: "GAS!",
                    onPress: () => {
                      payloadCart = {
                        service: serviceReceived,
                        perfume: perfumeReceived,
                        treatments: treatReceived,
                        pickup: delivery,
                      };
                      navigation.navigate("Map", { payloadCart });
                      // showMap();
                      // console.log(service);
                      // console.log(cartData);
                      // navigation.navigate("Cart", { cartData });
                    },
                    style: "cancel",
                  },
                  {
                    text: "Ga jadi",
                    onPress: () => {
                      setDelivery(true), console.log(delivery, "ga jadi");
                    },
                  },
                ]
              );
          },
        },
      ]);
    }
  }

  if (services) {
    return (
      <>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyleModal}
          >
            <View>
              <Text>Mau berapa {treatForAdd.name}?</Text>
            </View>
            <View>
              <Image
                style={styles.logo}
                source={{ uri: `${treatForAdd.imageUrl}` }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <IconButton
                icon="minus"
                color={Colors.blue800}
                size={20}
                onPress={() => decrementHandler()}
              />
              <TextInput
                style={{
                  width: 40,
                  height: 40,
                }}
                value={quantity.toString()}
                keyboardType="numeric"
                onChangeText={(val) => setQuantity(val)}
              />
              <IconButton
                icon="plus"
                color={Colors.blue800}
                size={20}
                onPress={() => incrementHandler()}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Button
                labelStyle={{ fontSize: 15, textAlign: "center", marginTop: 5 }}
                style={{ width: 80, height: 30, borderRadius: 10 }}
                mode="contained"
                onPress={() => submitExtraHandler(treatForAdd)}
              >
                Oke
              </Button>
            </View>
          </Modal>
        </Portal>
        {/* <Modal
            visible={mapVisible}
            onDismiss={hideMap}
            contentContainerStyle={containerStyleModal}
          >
            <View style={StyleSheet.absoluteFillObject}>
              <MapView
                style={StyleSheet.absoluteFillObject}
                showsUserLocation={true}
                // style={styles.map}
                loadingEnabled={true}
                region={{
                  latitude: location.coords.latitude, //37.78825,
                  longitude: location.coords.longitude, //-122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
              <View style={{ position: "absolute", top: 100, left: 50 }} />

              <View style={{ marginTop: 10 }}>
                <Button
                  labelStyle={{
                    fontSize: 15,
                    textAlign: "center",
                    marginTop: 5,
                  }}
                  style={{ width: 80, height: 30, borderRadius: 10 }}
                  mode="contained"
                  onPress={() => hideMap()}
                >
                  Oke
                </Button>
              </View>
            </View>
          </Modal> */}
        <DraxProvider>
          <View style={{ padding: 12 }}>
            <Chip
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0075F6",
                borderRadius: 0,
                justifyContent: "space-evenly",
              }}
            >
              PESANANMU
            </Chip>

            <DraxView
              onReceiveDragDrop={(event) => {
                if (event.dragged.payload.type == "service") {
                  setServiceReceived(event.dragged.payload.service);
                  // setServDrag(true);
                } else if (event.dragged.payload.type == "parfume") {
                  setPerfumeReceived(event.dragged.payload.parfume || "?");
                  // setParfDrag(true);
                }
              }}
              style={[styles.receivingZone, styles.blue]}
              receivingStyle={styles.receiving}
            >
              <ScrollView contentContainerStyle={styles.containerScroll}>
                {serviceReceived?.name && (
                  <View>
                    <Card
                      style={{
                        width: 160,
                        height: 170,
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 10,
                        borderRadius: 5,
                        marginVertical: 2,
                      }}
                    >
                      <View>
                        <View>
                          <Badge
                            size={25}
                            style={{
                              position: "absolute",
                              zIndex: 50,
                            }}
                            onPress={(e) =>
                              deleteOrder("service", serviceReceived.id)
                            }
                          >
                            X
                          </Badge>
                        </View>
                        <Chip
                          style={{
                            width: 150,
                            marginTop: 5,
                            justifyContent: "center",
                            backgroundColor: "#3DB2FF",
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        >
                          {serviceReceived.name}
                        </Chip>
                      </View>
                      <Card.Cover
                        style={{ width: 150, height: 120, marginTop: 5 }}
                        source={{ uri: `${serviceReceived.imageUrl}` }}
                      />
                    </Card>
                  </View>
                )}
                {perfumeReceived?.name && (
                  <View
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      style={{
                        width: 160,
                        height: 170,
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 10,
                        borderRadius: 5,
                        marginVertical: 2,
                      }}
                    >
                      <View>
                        <View>
                          <Badge
                            size={25}
                            style={{
                              position: "absolute",
                              zIndex: 50,
                            }}
                            onPress={(e) =>
                              deleteOrder("parfume", perfumeReceived.id)
                            }
                          >
                            X
                          </Badge>
                        </View>
                        <Chip
                          style={{
                            width: 150,
                            marginTop: 5,
                            justifyContent: "center",
                            backgroundColor: "#3DB2FF",
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        >
                          {perfumeReceived.name}
                        </Chip>
                      </View>
                      <Card.Cover
                        style={{ width: 150, height: 120, marginTop: 5 }}
                        source={{ uri: `${perfumeReceived.imageUrl}` }}
                      />
                    </Card>
                  </View>
                )}
                {treatReceived && (
                  <View
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    {treatReceived.map((treat) => {
                      return (
                        <Card
                          key={treat.id}
                          style={{
                            width: 160,
                            height: 170,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                            borderRadius: 5,
                            marginVertical: 2,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-end",
                            }}
                          >
                            <View>
                              <Badge
                                size={25}
                                style={{
                                  position: "absolute",
                                  zIndex: 50,
                                }}
                                onPress={(e) => deleteOrder("treat", treat.id)}
                              >
                                X
                              </Badge>
                            </View>
                          </View>
                          <Chip
                            style={{
                              width: 150,
                              marginTop: 5,
                              justifyContent: "center",
                              backgroundColor: "#3DB2FF",
                              borderTopRightRadius: 5,
                              borderTopLeftRadius: 5,
                              borderBottomRightRadius: 0,
                              borderBottomLeftRadius: 0,
                            }}
                          >
                            {treat.name}
                          </Chip>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Card.Cover
                              style={{
                                width: 150,
                                height: 120,
                                marginTop: 5,
                              }}
                              source={{ uri: `${treat.imageUrl}` }}
                            />
                            <Badge
                              size={25}
                              style={{
                                zIndex: 50,
                                position: "absolute",
                                borderRadius: 5,
                              }}
                              onPress={(e) => editQtyHandler(treat.id)}
                            >
                              total: {treat.qty}
                            </Badge>
                          </View>
                        </Card>
                      );
                    })}
                  </View>
                )}
              </ScrollView>
            </DraxView>
          </View>

          <ScrollView style={{ backgroundColor: "#B5DEFF" }}>
            {!serviceDragged && (
              <View style={styles.container}>
                <Chip
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0075F6",
                    borderRadius: 0,
                    justifyContent: "space-evenly",
                  }}
                >
                  PILIH SERVICE
                </Chip>
                <View style={styles.palette}>
                  <DraxScrollView horizontal={true}>
                    {services.map((service, index) => {
                      return (
                        <DraxView
                          key={index + 2}
                          style={[styles.centeredContent, styles.draggableBox]}
                          draggingStyle={styles.dragging}
                          dragReleasedStyle={styles.dragging}
                          hoverDraggingStyle={styles.hoverDragging}
                          dragPayload={{ service, type: "service" }}
                          longPressDelay={300}
                        >
                          <View
                            style={{
                              alignItems: "center",
                            }}
                          >
                            <Card
                              style={{
                                width: 160,
                                height: 170,
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: 10,
                                borderRadius: 5,
                              }}
                            >
                              <Chip
                                style={{
                                  width: 150,
                                  justifyContent: "center",
                                  backgroundColor: "#0075F6",
                                  marginTop: 5,
                                  borderTopRightRadius: 5,
                                  borderTopLeftRadius: 5,
                                  borderBottomRightRadius: 0,
                                  borderBottomLeftRadius: 0,
                                }}
                              >
                                {service.name}
                              </Chip>
                              <Card.Cover
                                style={{
                                  width: 150,
                                  height: 120,
                                  marginTop: 5,
                                }}
                                source={{ uri: `${service.imageUrl}` }}
                              />
                            </Card>
                          </View>
                        </DraxView>
                      );
                    })}
                  </DraxScrollView>
                </View>
              </View>
            )}

            {!parfumeDragged && (
              <View style={styles.container}>
                <Chip
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0075F6",
                    borderRadius: 0,
                    justifyContent: "space-evenly",
                  }}
                >
                  PILIH PARFUME
                </Chip>
                <View style={[styles.palette]}>
                  <DraxScrollView horizontal={true}>
                    {perfumes.map((parfume, index) => {
                      return (
                        <DraxView
                          key={index + 3}
                          style={[styles.centeredContent, styles.draggableBox]}
                          draggingStyle={styles.dragging}
                          dragReleasedStyle={styles.dragging}
                          hoverDraggingStyle={styles.hoverDragging}
                          dragPayload={{ parfume, type: "parfume" }}
                          longPressDelay={300}
                        >
                          <View
                            style={{
                              alignItems: "center",
                            }}
                          >
                            <Card
                              style={{
                                width: 160,
                                height: 170,
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: 10,
                                borderRadius: 5,
                              }}
                            >
                              <Chip
                                style={{
                                  width: 150,
                                  justifyContent: "center",
                                  backgroundColor: "#0075F6",
                                  marginTop: 5,
                                  borderTopRightRadius: 5,
                                  borderTopLeftRadius: 5,
                                  borderBottomRightRadius: 0,
                                  borderBottomLeftRadius: 0,
                                }}
                              >
                                {parfume.name}
                              </Chip>
                              <Card.Cover
                                style={{
                                  width: 150,
                                  height: 120,
                                  marginTop: 5,
                                }}
                                source={{ uri: `${parfume.imageUrl}` }}
                              />
                            </Card>
                          </View>
                        </DraxView>
                      );
                    })}
                  </DraxScrollView>
                </View>
              </View>
            )}

            <View style={styles.container}>
              <Chip
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0075F6",
                  borderRadius: 0,
                  justifyContent: "space-evenly",
                }}
              >
                EXTRA ORDER
              </Chip>
              <View style={[styles.palette]}>
                <ScrollView horizontal={true}>
                  {treatments.map((treat, index) => {
                    return (
                      <View
                        key={index + 4}
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <Card
                          onPress={() => treatHandler(treat)}
                          style={{
                            width: 160,
                            height: 170,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                            borderRadius: 5,
                          }}
                        >
                          <Chip
                            style={{
                              width: 150,
                              justifyContent: "center",
                              backgroundColor: "#3DB2FF",
                              marginTop: 5,
                              borderTopRightRadius: 5,
                              borderTopLeftRadius: 5,
                              borderBottomRightRadius: 0,
                              borderBottomLeftRadius: 0,
                            }}
                          >
                            {treat.name}
                          </Chip>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Card.Cover
                              style={{
                                width: 150,
                                height: 120,
                                marginTop: 5,
                              }}
                              source={{ uri: `${treat.imageUrl}` }}
                            />
                            <Badge
                              size={25}
                              style={{
                                zIndex: 50,
                                position: "absolute",
                                borderRadius: 5,
                              }}
                              onPress={(e) => editQtyHandler(treat.id)}
                            >
                              {convertToRupiah(treat.price)}
                            </Badge>
                          </View>
                        </Card>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </DraxProvider>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#B5DEFF",
          }}
        >
          <Button
            labelStyle={{ fontSize: 15, textAlign: "center" }}
            style={{ width: 200, height: 40, borderRadius: 10 }}
            mode="contained"
            onPress={() => chechoutHander()}
          >
            Laundry Sekarang
          </Button>
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
    padding: 12,
  },
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  receivingZone: {
    height: 180,
    width: windowWidth * 0.94,
    justifyContent: "flex-start",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  receiving: {
    borderColor: "green",
    borderWidth: 2,
  },
  incomingPayload: {
    marginTop: 10,
    fontSize: 24,
  },
  received: {
    marginTop: 10,
    fontSize: 18,
  },
  palette: {
    flexDirection: "row",
  },
  draggableBox: {
    width: 150,
    height: 170,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  green: {
    backgroundColor: "#aaffaa",
  },
  blue: {
    backgroundColor: "#3DB2FF",
  },
  red: {
    backgroundColor: "#ffaaaa",
  },
  yellow: {
    backgroundColor: "#ffffaa",
  },
  cyan: {
    backgroundColor: "#aaffff",
  },
  magenta: {
    backgroundColor: "#ffaaff",
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: "magenta",
    borderWidth: 2,
  },
  stagedCount: {
    fontSize: 18,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  containerScroll: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateOrder;
