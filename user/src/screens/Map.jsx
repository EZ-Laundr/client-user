import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Dimensions, StyleSheet, Text, View, Platform } from "react-native";
// import { MapViewDirections } from "react-native-maps-directions";
import { Button } from "react-native-paper";
const height = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const GOOGLE_MAPS_APIKEY = "AIzaSyBrBxPVos3uoCbgzIk4TB_LQas7wuZYOpU";
import * as Location from "expo-location";
import { getDistance, getPreciseDistance } from "geolib";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function Map({ route, navigation }) {
  const { payloadCart } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latToko, setLatToko] = useState(-5.370346);
  const [longToko, setLongToko] = useState(105.051187);
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getLastKnownPositionAsync({
        accuracy: 6,
      });
      setLocation(location);
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function calculateDistance() {
    var dis = getDistance(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      { latitude: latToko, longitude: longToko }
    );
    // alert(`Jarak\n${dis} Meter\nor\n${dis / 1000} KM`);
  }

  async function setCustAddress(e) {
    try {
      // console.log(e);
      setCoordinates({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      });
      // console.log(MapView.getCamera, "<<<<");
    } catch (error) {}
  }

  function goToCart() {
    const cartData = {
      service: payloadCart.service,
      perfume: payloadCart.perfume,
      treatments: payloadCart.treatments,
      pickup: payloadCart.pickup,
      customerAddress: coordinates,
    };
    navigation.navigate("Cart", { cartData });
  }

  function testOnPressMap(e) {
    setCoordinates({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  }
  if (location?.coords && coordinates?.latitude) {
    return (
      <>
        <MapView
          showsUserLocation={true}
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: coordinates.latitude, //37.78825,
            longitude: coordinates.longitude, //-122.4324,
            latitudeDelta: 0.005,
            longitudeDelta: 0.015,
          }}
          onLongPress={(e) => setCustAddress(e)}
        >
          {/* <MapView.Marker
          draggable
          coordinate={coordinates}
          onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
        /> */}
          {calculateDistance()}
          {/* 5b3ce3597851110001cf6248027fba2f206e4540bb957deae8cc76fb */}
          {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        /> */}
          {/* <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeColors={["#7F0000"]}
          strokeWidth={3}
          lineDashPattern={[1]}
        /> */}

          <MapView.Marker
            coordinate={{
              latitude: latToko,
              longitude: longToko,
            }}
            title="PIlih Lokasi"
            description={"Alamat Penjemputan"}
            draggable
            coordinate={coordinates}
            onDragEnd={(e) => setCustAddress(e)}
          />
        </MapView>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            alignItems: "center",
            bottom: 0,
            position: "absolute",
          }}
        >
          <Button
            labelStyle={{
              fontSize: 15,
              textAlign: "center",
              marginTop: 15,
            }}
            style={{ width: windowWidth, height: 50, borderRadius: 0 }}
            mode="contained"
            onPress={() => goToCart()}
          >
            Pilih Lokasi Penjemputan
          </Button>
        </View>
      </>
    );
  } else {
    return <Text>Loading..</Text>;
  }
}

const styles = StyleSheet.create({
  map: {
    height: height,
  },
});
