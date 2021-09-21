import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
const { width: screenWidth } = Dimensions.get("window");
import Carousel from "react-native-snap-carousel";

export default class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          key: 1,
          uri: "https://media.istockphoto.com/vectors/super-sale-poster-or-banner-design-with-70-discount-offer-on-white-vector-id1173750572",
          title: "Lorem ipsum dolor sit amet",
          content: "Neque porro quisquam est qui dolorem ipsum quia ",
        },
        {
          key: 1,
          uri: "https://img.freepik.com/free-vector/modern-shopping-banner-design-background_1017-16285.jpg?size=626&ext=jpg",
          title: "Lorem ipsum dolor sit amet",
          content: "Neque porro quisquam est qui dolorem ipsum quia ",
        },
        {
          key: 1,
          uri: "https://image.freepik.com/free-vector/black-friday-sale-discount-banner-template_1017-21882.jpg",
          title: "Lorem ipsum dolor sit amet",
          content: "Neque porro quisquam est qui dolorem ipsum quia ",
        },
        {
          key: 1,
          uri: "https://lh3.googleusercontent.com/proxy/8b5ouHuDnSILKTBJWRSYSoWPBKAevFukmG3F1tGLKwbI2zopMibhmb-FlLHg76NtSQsWUtnvDhLNZ94iFTnaYcGcmQiQaxv1tvbypg1ZJZgbkXU49d5yeRplBdEARcUnQqPq",
          title: "Lorem ipsum dolor sit amet",
          content: "Neque porro quisquam est qui dolorem ipsum quia ",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          borderRadius: 15,
          height: 200,
          padding: 40,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Image
          containerStyle={styles.imageContainer}
          style={styles.image}
          source={{ uri: item.uri }}
        />
        {/* <Text style={{ fontSize: 30 }}>{item.title}</Text> */}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={400}
            itemWidth={400}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            autoplay={true}
            loop={true}
            autoplayInterval={2000}
          />
        </View>
        <Image style={styles.logo} source={require("../img/EZ_Laundr.png")} />
        {/* <Text>Buat hidupmu mudah</Text>
        <Text>Biarkan kami yang mencucikan bajumu</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 20,
  },
  logo: {
    width: 150,
    height: 80,
    alignSelf: "flex-end",
  },
});
