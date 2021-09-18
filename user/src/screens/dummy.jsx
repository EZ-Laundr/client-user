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
import { Chip, Button, Card, Title } from "react-native-paper";
import { DraxProvider, DraxView } from "react-native-drax";
import { useDispatch, useSelector } from "react-redux";
const windowWidth = Dimensions.get("window").width;
const App = () => {
  const [received, setReceived] = React.useState([]);
  const [staged, setStaged] = React.useState([]);
  const [serviceDragged, setServDrag] = React.useState(false);
  const [parfumeDragged, setParfDrag] = React.useState(false);
  const [delivery, setDelivery] = React.useState(false);

  const { services, access_token, loading } = useSelector(
    (state) => state.reducer
  );

  function chechoutHander() {
    let parfume = received.filter((el) => el.parfume);
    let service = received.filter((el) => el.service);
    let treat = received.filter((el) => el.parfume);
    let payload;

    // Alert.alert("test");

    Alert.alert("Mau yang mana?", "Mau nganter apa di jemput nih?", [
      {
        text: "Anter Aja",
        onPress: () => {
          setDelivery(false),
            Alert.alert("Di anter yaa?", "lanjut checkout kuy?", [
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

          <View>
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
                  // setParfDrag(true);
                }
              }}
              style={[styles.receivingZone, styles.blue]}
              receivingStyle={styles.receiving}
            >
              {console.log("received>>>>", received)}
              <ScrollView contentContainerStyle={styles.containerScroll}>
                {received.map((service, index) => {
                  return (
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
                          {service.title}
                        </Chip>
                        <Card.Cover
                          style={{ width: 150, height: 120, marginTop: 5 }}
                          source={{ uri: `${service.image}` }}
                        />
                      </Card>
                    </View>
                  );
                })}
              </ScrollView>
            </DraxView>
          </View>
          <View style={styles.container}>
            <ScrollView>
              {!serviceDragged && (
                <>
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
                            key={index + 1}
                            style={[
                              styles.centeredContent,
                              styles.draggableBox,
                            ]}
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
                                  {service.title}
                                </Chip>
                                <Card.Cover
                                  style={{
                                    width: 150,
                                    height: 120,
                                    marginTop: 5,
                                  }}
                                  source={{ uri: `${service.image}` }}
                                />
                              </Card>
                            </View>
                          </DraxView>
                        );
                      })}
                    </ScrollView>
                  </View>
                </>
              )}

              {!parfumeDragged && (
                <>
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
                      {services.map((parfume, index) => {
                        return (
                          <DraxView
                            key={index + 2}
                            style={[
                              styles.centeredContent,
                              styles.draggableBox,
                            ]}
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
                                  {parfume.title}
                                </Chip>
                                <Card.Cover
                                  style={{
                                    width: 150,
                                    height: 120,
                                    marginTop: 5,
                                  }}
                                  source={{ uri: `${parfume.image}` }}
                                />
                              </Card>
                            </View>
                          </DraxView>
                        );
                      })}
                    </ScrollView>
                  </View>
                </>
              )}

              {!parfumeDragged && (
                <>
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
                      {services.map((parfume, index) => {
                        return (
                          <DraxView
                            key={index + 3}
                            style={[
                              styles.centeredContent,
                              styles.draggableBox,
                            ]}
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
                                  {parfume.title}
                                </Chip>
                                <Card.Cover
                                  style={{
                                    width: 150,
                                    height: 120,
                                    marginTop: 5,
                                  }}
                                  source={{ uri: `${parfume.image}` }}
                                />
                              </Card>
                            </View>
                          </DraxView>
                        );
                      })}
                    </ScrollView>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
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
    height: 400,
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

export default App;
