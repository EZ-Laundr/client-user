import { ExpoLeaflet } from "expo-leaflet";
import * as Location from "expo-location";
// import type { LatLngLiteral } from "leaflet";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MapLayer } from "expo-leaflet";
import { mapMarkers, mapShapes } from "./mockData";

let marker = {
  id: "1", // The ID attached to the marker. It will be returned when onMarkerClicked is called
  position: {
    lat: 52.1,
    lng: 2.3,
  },
  // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
  icon: "<span>🍇</span>",
  size: [32, 32],
};
let mapLayer = {
  baseLayerName: "OpenStreetMap", // This will be seen in the layer selection control
  baseLayerIsChecked: "true", // If the layer is selected in the layer selection control
  layerType: "TileLayer",
  baseLayer: true,
  url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
  attribution:
    "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
};

const initialPosition = {
  lat: 51.4545,
  lng: 2.5879,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    backgroundColor: "dodgerblue",
    paddingHorizontal: 10,
    paddingTop: 30,
    width: "100%",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  mapControls: {
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 5,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    marginHorizontal: 10,
    padding: 7,
    position: "absolute",
    right: 0,
  },
  mapButton: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  mapButtonEmoji: {
    fontSize: 28,
  },
});

export default function Map() {
  const [zoom, setZoom] = useState(7);
  const [mapCenterPosition, setMapCenterPosition] = useState(initialPosition);
  const [ownPosition, setOwnPosition] =
    (useState < null) | (LatLngLiteral > null);

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      if (!ownPosition) {
        setOwnPosition({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    };

    getLocationAsync().catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>expo-leaflet</Text>
      </View>
      <View style={{ flex: 1, position: "relative" }}>
        <ExpoLeaflet
          loadingIndicator={() => <ActivityIndicator />}
          mapCenterPosition={mapCenterPosition}
          mapLayers={mapLayers}
          mapMarkers={mapMarkers}
          mapOptions={mapOptions}
          mapShapes={mapShapes}
          maxZoom={20}
          onMessage={(message) => {
            switch (message.tag) {
              case "onMapMarkerClicked":
                Alert.alert(
                  `Map Marker Touched, ID: ${message.mapMarkerId || "unknown"}`
                );
                break;
              case "onMapClicked":
                Alert.alert(
                  `Map Touched at:`,
                  `${message.location.lat}, ${message.location.lng}`
                );
                break;
              case "onMoveEnd":
                setMapCenterPosition(message.mapCenter);
                break;
              case "onZoomEnd":
                setZoom(message.zoom);
                break;
              default:
                if (["onMove"].includes(message.tag)) {
                  return;
                }
                console.log(message);
            }
          }}
          zoom={zoom}
        />
      </View>
      <Button
        onPress={() => {
          setMapCenterPosition(initialPosition);
          setZoom(7);
        }}
        title="Reset Map"
      />
    </SafeAreaView>
  );
}
