import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, CheckBox, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
export default function CreateOrder({ navigation }) {
  const [servicesSelected, setServicesSelected] = useState("");
  const [parumeSelected, setParfumeSelected] = useState("");
  const [treatmentSelected, setTreatmentSelected] = useState("");
  const [delivery, setDelivery] = useState(false);

  //   function checkoutHandler() {
  //     const payload = {
  //       service: servicesSelected,
  //       parfume: parumeSelected,
  //       treatment: treatmentSelected,
  //       delivery: delivery,
  //     };
  //     console.log(payload);
  //   }

  return (
    <>
      <View style={{ paddingTop: 3 }}>
        <Text style={{ textAlign: "center" }}> Services :</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={parumeSelected}
            onValueChange={(parfume, itemIndex) => setParfumeSelected(parfume)}
          >
            <Picker.Item enabled={false} label="Select Parfume" value="" />
            <Picker.Item label="Parfume 1" value="Parfume 1" />
            <Picker.Item label="Parfume 2" value="Parfume 2" />
            <Picker.Item label="Parfume 3" value="Parfume 3" />
            <Picker.Item label="Parfume 4" value="Parfume 4" />
          </Picker>
        </View>
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={servicesSelected}
          onValueChange={(service, itemIndex) => setServicesSelected(service)}
        >
          <Picker.Item enabled={false} label="Select Service" value="" />
          <Picker.Item label="Service 1" value="Service 1" />
          <Picker.Item label="Service 2" value="Service 2" />
          <Picker.Item label="Service 3" value="Service 3" />
          <Picker.Item label="Service 4" value="Service 4" />
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={treatmentSelected}
          onValueChange={(treat, itemIndex) => setTreatmentSelected(treat)}
        >
          <Picker.Item enabled={false} label="Select Treatment" value="" />
          <Picker.Item label="Treatment 1" value="Treatment 1" />
          <Picker.Item label="Treatment 2" value="Treatment 2" />
          <Picker.Item label="Treatment 3" value="Treatment 3" />
          <Picker.Item label="Treatment 4" value="Treatment 4" />
        </Picker>
      </View>
      <View>
        <Text>Select Delivery</Text>
        <View style={styles.delivery}>
          <View style={tw`max-w-md`}>
            <Card containerStyle={tw`w-40 h-32`}>
              <Card.Title>PICK UP</Card.Title>

              <Text style={{ marginBottom: 10 }}>Ambil ke toko</Text>
              <CheckBox
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="blue"
                checked={!delivery}
                onPress={() => setDelivery(false)}
              />
            </Card>
          </View>
          <View>
            <Card containerStyle={tw`w-40 h-32`}>
              <Card.Title>TITLE</Card.Title>
              <Text style={{ marginBottom: 10 }}>Tunggu dirumah</Text>
              <CheckBox
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="blue"
                checked={delivery}
                onPress={() => setDelivery(true)}
              />
            </Card>
          </View>
        </View>
        <View style={tw`mt-2`}>
          <Button
            title="Checkout"
            onPress={() =>
              navigation.navigate("Cart", {
                servicesSelected,
                parumeSelected,
                treatmentSelected,
                delivery,
              })
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "#A45D5D",
    textAlign: "center",
    height: 25,
    width: 200,
    borderRadius: 15,
  },
  delivery: {
    flexDirection: "row",
  },
});
