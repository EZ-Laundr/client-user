import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
const { width: screenWidth } = Dimensions.get("window");
import AppLoading from "expo-app-loading";
const MyCarousel = ({ item }) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  let [fontsLoaded] = useFonts({
    Eczar: require("../assets/Eczar/Eczar-Regular.ttf"),
  });

  useEffect(() => {
    setEntries(item);
  }, [item]);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.imageUrl }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.5}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    );
  };
  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={goForward}>
          <Text
            style={{
              fontFamily: "Eczar",
              fontSize: 20,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Our Services
          </Text>
        </TouchableOpacity>
        <Carousel
          layout={"default"}
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 200}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
          loop={true}
          // autoplay={true}
          autoplayInterval={2000}
          inactiveSlideScale={0.7}
          activeAnimationType="spring"
          enableSnap={true}
          loopClonesPerSide={50}
        />
      </View>
    );
  } else {
    return <AppLoading />;
  }
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 200,
    height: screenWidth - 200,
    borderRadius: 10,
    backgroundColor: "#5089C6",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 10,
    backgroundColor: "#5089C6",
    marginTop: 5,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    resizeMode: "center",
  },
  title: {
    backgroundColor: "#5089C6",
    height: 30,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    borderRadius: 10,
  },
});
