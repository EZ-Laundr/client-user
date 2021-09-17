import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, CheckBox, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
export default function CreateOrder({ navigation }) {
  const [servicesSelected, setServicesSelected] = useState();
  const [parumeSelected, setParfumeSelected] = useState();
  const [treatmentSelected, setTreatmentSelected] = useState();
  const [delivery, setDelivery] = useState(false);

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
            <Picker.Item label="Random" value="random" />
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Hard" value="hard" />
          </Picker>
        </View>
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={servicesSelected}
          onValueChange={(value, itemIndex) => setServicesSelected(value)}
        >
          <Picker.Item enabled={false} label="Select Service" value="" />
          <Picker.Item label="Service 1" value="java" />
          <Picker.Item label="Service 2" value="java" />
          <Picker.Item label="Service 3" value="java" />
          <Picker.Item label="Service 4" value="java" />
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={treatmentSelected}
          onValueChange={(value, itemIndex) => setTreatmentSelected(value)}
        >
          <Picker.Item enabled={false} label="Select Treatment" value="" />
          <Picker.Item label="Service 1" value="java" />
          <Picker.Item label="Service 2" value="java" />
          <Picker.Item label="Service 3" value="java" />
          <Picker.Item label="Service 4" value="java" />
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
            onPress={() => navigation.navigate("Cart")}
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
