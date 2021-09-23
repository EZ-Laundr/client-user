import React, { useState } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";

import { Avatar, Button, Title, Chip } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
import { useDispatch, useSelector } from "react-redux";

export default function CardService({ service, navigation }) {
  const { services, access_token, loading, perfumes, treatments } = useSelector(
    (state) => state.reducer
  );

  // setModalVisible(visible) {
  //   this.setState({modalVisible: visible});
  // }

  const cardGap = 20;

  const cardWidth = (Dimensions.get("window").width - cardGap * 2.5) / 4;

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 15,
      }}
    >
      <Text
        style={{
          alignSelf: "flex-start",
          marginLeft: 16,
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        Layanan Kami
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {services.map((serv) => {
          return (
            <View
              key={serv.id}
              style={{
                marginTop: cardGap,
                widthType: "auto",
                heightType: "auto",
                backgroundColor: "white",
                borderRadius: 16,
                shadowOpacity: 0.2,
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={{
                    uri: serv.imageUrl,
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                />
              </TouchableOpacity>
              <Text style={{ alignSelf: "center" }}>{serv.name}</Text>
            </View>
          );
        })}
      </View>
      <Text
        style={{
          alignSelf: "flex-start",
          marginLeft: 16,
          fontWeight: "bold",
          fontSize: 15,
          marginTop: 30,
        }}
      >
        Pilihan Parfum
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {perfumes.map((perfume) => {
          return (
            <View
              key={perfume.id}
              style={{
                marginTop: cardGap,
                width: cardWidth,
                backgroundColor: "white",
                borderRadius: 16,
                shadowOpacity: 0.2,
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
                height: 110,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={{
                    uri: perfume.imageUrl,
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                />
                <Text style={{ textAlign: "center" }}>{perfume.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <Text
        style={{
          alignSelf: "flex-start",
          marginLeft: 16,
          fontWeight: "bold",
          fontSize: 15,
          marginTop: 30,
        }}
      >
        Special Treatments
      </Text>
      {/* <ScrollView horizontal={true}> */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {treatments.map((perfume) => {
          return (
            <View
              key={perfume.id}
              style={{
                marginTop: cardGap,
                marginBottom: cardGap,
                width: (Dimensions.get("window").width - cardGap * 3) / 3,
                backgroundColor: "white",
                borderRadius: 16,
                shadowOpacity: 0.2,
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
                marginHorizontal: 5,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={{
                    uri: perfume.imageUrl,
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                />
                <Text style={{ textAlign: "center" }}>{perfume.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      {/* </ScrollView> */}
    </ScrollView>

    // <View>
    //     <View
    //         style={{
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //         }}
    //     >
    //         <Card
    // style={{
    //     width: 180,
    //     height: 180,
    //     margin: 5,
    //     alignItems: "center",
    // }}
    //         >
    // <Card.Cover
    //     style={{ width: 120, height: 120, marginTop: 10 }}
    //     source={{ uri: `${service.imageUrl}` }}
    // />
    //             <Card.Actions>
    //                 <Chip
    //                     labelStyle={{ fontSize: 10 }}
    //                     style={{
    //                         width: 100,
    //                         height: 30,
    //                         alignItems: "center",
    //                         justifyContent: "center",
    //                         backgroundColor: "#3DB2FF",
    //                         borderRadius: 0,
    //                         justifyContent: "space-evenly",
    //                     }}
    //                     mode="contained"
    //                 >
    //                     {service.name}
    //                 </Chip>
    //             </Card.Actions>
    //         </Card>
    //     </View>
    // </View>
  );
}
