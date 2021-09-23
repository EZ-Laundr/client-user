import React, { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchParfume, fetchTreatment } from "../store/action";

export default function PerfumeDrawer() {
  const dispatch = useDispatch();

  const { services, perfumes, treatments, access_token, loading } = useSelector(
    (state) => state.reducer
  );

  useEffect(() => {
    dispatch(fetchParfume());
    dispatch(fetchTreatment());
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {perfumes.map((perfume) => {
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card style={styles.unSelected}>
              <View>
                <Card.Cover
                  style={styles.content}
                  source={{ uri: `${perfume.imageUrl}` }}
                />

                <View>
                  <Text
                    style={{
                      fontSize: 10,
                    }}
                  >
                    nama
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                    }}
                  >
                    harga
                  </Text>
                </View>
              </View>
            </Card>
          </View>;
        })}
      </View>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
  },
  content: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.2,
    marginTop: 5,
    borderRadius: 15,
  },
  unSelected: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.29,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 15,
  },
});
