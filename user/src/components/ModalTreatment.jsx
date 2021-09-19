import * as React from "react";
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

export default function ModalTreatment() {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyleModal}
      >
        <Text>Mau berapa ?</Text>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="minus"
            color={Colors.blue800}
            size={20}
            onPress={() => console.log("Pressed")}
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
            onPress={() => console.log("Pressed")}
          />
        </View>
      </Modal>
    </Portal>
  );
}
