import React from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail, fetchQrCode } from "../store/action";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Modal,
  Portal,
} from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
export default function QrCode({ route }) {
  const dispatch = useDispatch();
  const {
    detailOrder,
    qrCode,
    orders,
    perfumes,
    treatments,
    access_token,
    loading,
  } = useSelector((state) => state.reducer);
  const { orderId } = route.params;
  const [visible, setVisible] = React.useState(false);
  const [visibleStatus, setStatusVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showStatus = () => setStatusVisible(true);
  const hideStatus = () => setStatusVisible(false);
  React.useEffect(() => {
    dispatch(fetchQrCode(`edit/${orderId}`));
    dispatch(fetchOrderDetail(orderId));
  }, []);

  const containerStyleModal = {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    textAlign: "center",
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyleModal}
        >
          <View>
            <Image
              style={styles.codeImage}
              source={{ uri: `${qrCode.qrcode}` }}
            />
          </View>

          <Button
            labelStyle={{ fontSize: 15, textAlign: "center", marginTop: 5 }}
            style={{ width: 80, height: 30, borderRadius: 10 }}
            mode="contained"
            onPress={() => hideModal()}
          >
            Oke
          </Button>
        </Modal>

        <Modal
          visible={visibleStatus}
          onDismiss={hideStatus}
          contentContainerStyle={containerStyleModal}
        >
          <View>
            <Text>INI STATUS</Text>
          </View>
          <Button
            labelStyle={{ fontSize: 15, textAlign: "center", marginTop: 5 }}
            style={{ width: 80, height: 30, borderRadius: 10 }}
            mode="contained"
            onPress={() => hideStatus()}
          >
            Oke
          </Button>
        </Modal>
      </Portal>
      <Card>
        <Card.Title title={detailOrder.Service.name} />
        <Card.Cover source={{ uri: `${detailOrder.Service.imageUrl}` }} />
        <Card.Content>
          <View>
            <Title>With perfume</Title>
            {/* <Paragraph>{detailOrder.perfume.name}</Paragraph> */}
            <Paragraph>nama perfume</Paragraph>
            <View>
              <Image
                style={{ width: 80, height: 80, borderRadius: 20 }}
                source={{ uri: `${detailOrder.Service.imageUrl}` }}
              />
              {/* <Text>{convertToRupiah(+detailOrder.perfume.price)}</Text> */}
              <Text>harga perfume</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {detailOrder.OrderSpecials.map((treat) => {
              return (
                <View>
                  <Paragraph>{treat.SpecialTreatment.name}</Paragraph>
                  <View>
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 20 }}
                      source={{ uri: `${treat.SpecialTreatment.imageUrl}` }}
                    />
                    {/* <Text>{convertToRupiah(+cartData.perfume.price)}</Text> */}
                  </View>
                </View>
              );
            })}
          </View>
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          bottom: 3,
          position: "absolute",
        }}
      >
        <Button
          labelStyle={{ fontSize: 20, textAlign: "center" }}
          style={{
            width: windowWidth,
            height: 40,
            borderRadius: 0,
          }}
          mode="contained"
          onPress={() => showStatus()}
        >
          Status Order
        </Button>
        <Button
          labelStyle={{ fontSize: 20, textAlign: "center" }}
          style={{
            width: windowWidth,
            height: 40,
            borderRadius: 0,
          }}
          mode="contained"
          onPress={() => showModal()}
        >
          Show QR Code
        </Button>
      </View>
    </>
  );

  // return (
  //   <View style={styles.background}>
  //     <View style={{ flexDirection: "row" }}>
  //       <Card
  //         style={{
  //           width: windowWidth,
  //           height: 180,
  //           margin: 5,
  //           alignItems: "center",
  //           backgroundColor: "#3DB2FF",
  //         }}
  //       >
  //         <View style={{ flexDirection: "row" }}>
  //           <View>
  //             <Card.Title
  //               title={detailOrder.Service.name}
  //               subtitle={"Nama Perfume"}
  //             />
  //             <Card.Cover
  //               style={{ width: 120, height: 120, marginTop: 10 }}
  //               source={{ uri: `${detailOrder.Service.imageUrl}` }}
  //             />
  //           </View>
  //         </View>
  //       </Card>
  //     </View>
  //     <View>
  //       <Image style={styles.codeImage} source={{ uri: `${qrCode.qrcode}` }} />
  //     </View>
  //     {/* <Text>{JSON.stringify(detailOrder)}</Text> */}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  codeImage: {
    width: 200,
    height: 200,
  },
});
