import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Dimensions, StyleSheet, Text, View, Platform } from "react-native";
// import { MapViewDirections } from "react-native-maps-directions";
const height = Dimensions.get("window").height;

const GOOGLE_MAPS_APIKEY = "AIzaSyBrBxPVos3uoCbgzIk4TB_LQas7wuZYOpU";
import * as Location from "expo-location";
import { getDistance, getPreciseDistance } from "geolib";
export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latToko, setLatToko] = useState(-5.370346);
  const [longToko, setLongToko] = useState(105.051187);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
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
      setCoordinates([
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        { latitude: latToko, longitude: longToko },
      ]);
      console.log(location);
    })();
  }, []);

  function calculateDistance() {
    var dis = getDistance(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      { latitude: latToko, longitude: longToko }
    );
    alert(`Jarak\n${dis} Meter\nor\n${dis / 1000} KM`);
  }

  if (location?.coords) {
    return (
      <MapView
        showsUserLocation={true}
        style={styles.map}
        loadingEnabled={true}
        region={{
          latitude: location.coords.latitude, //37.78825,
          longitude: location.coords.longitude, //-122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {calculateDistance()}
        {/* 5b3ce3597851110001cf6248027fba2f206e4540bb957deae8cc76fb */}
        {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        /> */}
        <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeColors={["#7F0000"]}
          strokeWidth={3}
          lineDashPattern={[1]}
        />

        <MapView.Marker
          coordinate={{
            latitude: latToko,
            longitude: longToko,
          }}
          title="Title 1"
          description={"Desc 1"}
        />
      </MapView>
    );
  } else {
    return <Text>Loading..</Text>;
  }
}

const styles = StyleSheet.create({
  map: {
    height,
  },
});
