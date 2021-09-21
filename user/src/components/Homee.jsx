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

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = ({ services }) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useFocusEffect(
    React.useCallback(() => {
      setEntries(services);
    }, [])
  );

  //   useEffect(() => {
  //     setEntries(forRender);
  //   }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.imageUrl }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}>
        <Text>Our Services</Text>
      </TouchableOpacity>
      <Carousel
        layout={"default"}
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 200}
        data={services}
        renderItem={renderItem}
        // hasParallaxImages={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 200,
    height: screenWidth - 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#5089C6",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#5089C6",
    marginTop: 5,
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "center",
  },
  title: {
    backgroundColor: "#5089C6",
    height: 30,
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});
