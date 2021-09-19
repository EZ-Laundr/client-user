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
} from "react-native-paper";
import { DraxProvider, DraxView } from "react-native-drax";
import { useDispatch, useSelector } from "react-redux";
import { fetchParfume, fetchServices, fetchTreatment } from "../store/action";
const windowWidth = Dimensions.get("window").width;
const CreateOrder = ({ navigation }) => {
  const dispatch = useDispatch();
  const [received, setReceived] = React.useState([]);
  const [quantity, setQuantity] = React.useState(0);
  const [staged, setStaged] = React.useState([]);
  const [serviceDragged, setServDrag] = React.useState(false);
  const [parfumeDragged, setParfDrag] = React.useState(false);
  const [delivery, setDelivery] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [treatForAdd, setTreatAdd] = React.useState({});
  const [treatForSend, setTreatForSend] = React.useState([]);

  const { services, perfumes, treatments, access_token, loading } = useSelector(
    (state) => state.reducer
  );
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  React.useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchParfume());
    dispatch(fetchTreatment());
  }, []);

  const containerStyleModal = {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    textAlign: "center",
  };

  function submitExtraHandler() {
    let newTreat = {
      id: treatForAdd.id,
      title: treatForAdd.name,
      qty: quantity,
      price: treatForAdd.price,
    };
    setTreatForSend([...treatForSend, newTreat]);
    hideModal();
  }

  function treatHandler(treat) {
    setTreatAdd(treat);
    showModal();
  }

  function incrementHandler() {
    setQuantity(quantity + 1);
  }

  function decrementHandler() {
    setQuantity(quantity - 1);
  }

  function chechoutHander() {
    let parfume = received.filter((el) => el.parfume);
    let service = received.filter((el) => el.service);

    let cartData;

    Alert.alert("Mau yang mana?", "Mau nganter apa di jemput nih?", [
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
                    service: service[0].service,
                    perfume: parfume[0].parfume,
                    treatments: treatForSend,
                    pickup: delivery,
                  };
                  console.log(payload);
                  navigation.navigate("Cart", { cartData });
                },
                style: "cancel",
              },
              {
                text: "Ga jadi",
                onPress: () => {
                  setDelivery(true), console.log(delivery);
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
            Alert.alert("Okeey dijemput", "lanjut checkout kuy?", [
              {
                text: "GAS!",
                onPress: () => {
                  setDelivery(false), console.log(delivery);
                },
                style: "cancel",
              },
              {
                text: "Ga jadi",
                onPress: () => {
                  setDelivery(true), console.log(delivery);
                },
              },
            ]),
            console.log(delivery);
        },
      },
    ]);

    console.log(payload, "payload");
    // const payload = {
    //   ServiceId: servicesSelected,
    //   ParfumeId: parumeSelected,
    //   treatments: treatmentSelected,
    //   pickup: delivery,
    // };
  }

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
              onPress={() => submitExtraHandler()}
            >
              Oke
            </Button>
          </View>
        </Modal>
      </Portal>
      <DraxProvider>
        <View style={{ padding: 12 }}>
          <Chip
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3DB2FF",
              borderRadius: 0,
              justifyContent: "space-evenly",
            }}
          >
            PESANANMU
          </Chip>

          <DraxView
            onReceiveDragDrop={(event) => {
              if (event.dragged.payload.type == "service") {
                setReceived([
                  ...received,
                  { service: event.dragged.payload.service } || "?",
                ]);
                setServDrag(true);
              } else if (event.dragged.payload.type == "parfume") {
                setReceived([
                  ...received,
                  { parfume: event.dragged.payload.parfume } || "?",
                ]);
                setParfDrag(true);
              }
            }}
            style={[styles.receivingZone, styles.blue]}
            receivingStyle={styles.receiving}
          >
            <ScrollView contentContainerStyle={styles.containerScroll}>
              {received.map((item, index) => {
                return (
                  <View key={index + 1}>
                    {item.service && (
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
                            {item.service.name}
                          </Chip>
                          <Card.Cover
                            style={{ width: 150, height: 120, marginTop: 5 }}
                            source={{ uri: `${item.service.imageUrl}` }}
                          />
                        </Card>
                      </View>
                    )}
                    {item.parfume && (
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
                            {item.parfume.name}
                          </Chip>
                          <Card.Cover
                            style={{ width: 150, height: 120, marginTop: 5 }}
                            source={{ uri: `${item.parfume.imageUrl}` }}
                          />
                        </Card>
                      </View>
                    )}
                    {item.treat && (
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
                            {item.treat.name}
                          </Chip>
                          <Card.Cover
                            style={{ width: 150, height: 120, marginTop: 5 }}
                            source={{ uri: `${item.treat.imageUrl}` }}
                          />
                        </Card>
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </DraxView>
        </View>

        <ScrollView>
          {!serviceDragged && (
            <View style={styles.container}>
              <Chip
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#3DB2FF",
                  borderRadius: 0,
                  justifyContent: "space-evenly",
                }}
              >
                PILIH SERVICE
              </Chip>
              <View style={styles.palette}>
                <ScrollView horizontal={true}>
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
                                backgroundColor: "#3DB2FF",
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
                </ScrollView>
              </View>
            </View>
          )}

          {!parfumeDragged && (
            <View style={styles.container}>
              <Chip
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#3DB2FF",
                  borderRadius: 0,
                  justifyContent: "space-evenly",
                }}
              >
                PILIH PARFUME
              </Chip>
              <View style={[styles.palette]}>
                <ScrollView horizontal={true}>
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
                                backgroundColor: "#3DB2FF",
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
                </ScrollView>
              </View>
            </View>
          )}

          <View style={styles.container}>
            <Chip
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#3DB2FF",
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
                        <Card.Cover
                          style={{
                            width: 150,
                            height: 120,
                            marginTop: 5,
                          }}
                          source={{ uri: `${treat.imageUrl}` }}
                        />
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
        }}
      >
        <Button
          labelStyle={{ fontSize: 20, textAlign: "center" }}
          style={{ width: 200, height: 40, borderRadius: 10 }}
          mode="contained"
          onPress={() => chechoutHander()}
        >
          Checkout
        </Button>
      </View>
    </>
  );
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
    backgroundColor: "#aaaaff",
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
