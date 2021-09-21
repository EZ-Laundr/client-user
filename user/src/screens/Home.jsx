import React, { useEffect } from "react";
import {
    Dimensions,
    Text,
    View,
    ScrollView,
    Alert,
    RefreshControl,
} from "react-native";
import CardService from "../components/CardService";
import { SafeAreaView } from "react-native-safe-area-context";
const height = Dimensions.get("window").height;
import { useDispatch, useSelector } from "react-redux";
import { Button, FAB, Portal, Provider } from "react-native-paper";
import CarouselItem from "../components/CarouselItem";
import {
    fetchParfume,
    fetchServices,
    fetchTreatment,
    setLoading,
    setToken,
} from "../store/action";

import { Loading } from "../components/LoadingPage";

import MyCarousel from "../components/Homee";


import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useState, useRef } from "react";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
//-----------------------------------------------------------

export default function Home({ navigation }) {
    const dispatch = useDispatch();
    const { services, perfumes, treatments, access_token, loading } =
        useSelector((state) => state.reducer);
    const [state, setState] = React.useState({ open: false });
    const [refreshing, setRefreshing] = React.useState(false);
    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    //-------------------------------------------------------
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response, 2);
                    navigation.navigate("Ez Loundr");
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);
    //-------------------------------------------------------

    useEffect(() => {
        dispatch(fetchServices());
        dispatch(fetchParfume());
        dispatch(fetchTreatment());
        dispatch(setLoading(false));
    }, []);

    const wait = (timeout) => {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(fetchServices());
        dispatch(fetchParfume());
        dispatch(fetchTreatment());
        wait(2000).then(() => setRefreshing(false));
    }, []);

    function createOrderHandler() {
        if (access_token == "") {
            Alert.alert("Login Status", "Kamu harus login dulu", [
                {
                    text: "Login",
                    onPress: () => {
                        dispatch(setLoading(true));
                        navigation.navigate("Login");
                        console.log("jalan");
                    },
                    style: "ok",
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ]);
        } else {
            navigation.navigate("Create Order");
        }
    }

    function logoutHandler() {
        dispatch(setToken(""));
        Alert.alert("Logout Sukses", "Kamu berhasil logout!");
    }

    return (
        <>
            <Provider>
                <View style={{ flex: 1, backgroundColor: "#1EAFED" }}>
                    <View style={{ height: height * 0.45 }}>
                        <CarouselItem />
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View>
                            <View style={{ marginTop: 20 }}>
                                <Text>Services</Text>
                            </View>
                            <ScrollView horizontal={true}>
                                <View
                                    style={{
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}
                                >
                                    {services.map((service, index) => {
                                        return (
                                            <View key={index}>
                                                <CardService
                                                    service={service}
                                                    navigation={navigation}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                        <View>
                            <View style={{ marginTop: 20 }}>
                                <Text>Perfumes</Text>
                            </View>
                            <ScrollView horizontal={true}>
                                <View
                                    style={{
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}
                                >
                                    {perfumes.map((service, index) => {
                                        return (
                                            <View key={index}>
                                                <CardService
                                                    service={service}
                                                    navigation={navigation}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                        <View>
                            <View style={{ marginTop: 20 }}>
                                <Text>Ekstra Order</Text>
                            </View>
                            <ScrollView horizontal={true}>
                                <View
                                    style={{
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}
                                >
                                    {treatments.map((service, index) => {
                                        return (
                                            <View key={index}>
                                                <CardService
                                                    service={service}
                                                    navigation={navigation}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
                <Portal>
                    {access_token == "" ? (
                        <FAB.Group
                            fabStyle={{ backgroundColor: "#3DB2FF" }}
                            color="#FFFF"
                            style={{ zIndex: 50 }}
                            open={open}
                            icon={open ? "basket-outline" : "plus"}
                            actions={[
                                {
                                    icon: "login",
                                    label: "Login",
                                    onPress: (e) => {
                                        dispatch(setLoading(true)),
                                            console.log("jalan");
                                        navigation.navigate("Login");
                                    },
                                    small: false,
                                },

                                {
                                    icon: "washing-machine",
                                    label: "Pesan Laundry",
                                    onPress: () => createOrderHandler(),
                                    small: false,
                                },
                            ]}
                            onStateChange={onStateChange}
                            onPress={() => {
                                if (open) {
                                    // do something if the speed dial is open
                                }
                            }}
                        />
                    ) : (
                        <FAB.Group
                            fabStyle={{ backgroundColor: "#3DB2FF" }}
                            color="#FFFF"
                            style={{ zIndex: 50 }}
                            open={open}
                            icon={open ? "basket-outline" : "plus"}
                            actions={[
                                {
                                    icon: "logout",
                                    label: "Logout",
                                    onPress: () => logoutHandler(),
                                    small: false,
                                },
                                {
                                    icon: "chat",
                                    label: "Chat Admin",
                                    onPress: () =>
                                        navigation.navigate("Chat Admin"),
                                    small: false,
                                },
                                {
                                    icon: "washing-machine",
                                    label: "Pesan Laundry",
                                    onPress: () => createOrderHandler(),
                                    small: false,
                                },
                            ]}
                            onStateChange={onStateChange}
                            onPress={() => {
                                if (open) {
                                    // do something if the speed dial is open
                                }
                            }}
                        />
                    )}
                </Portal>
            </Provider>
        </>
    );
}
