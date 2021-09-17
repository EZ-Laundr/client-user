import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./src/screens/Home";
import OrderList from "./src/screens/OrderList";
import Cart from "./src/screens/Cart";
import OrderCompleted from "./src/screens/OrderCompleted";
import QrCode from "./src/screens/QrCode";
import OrderStatus from "./src/screens/OrderStatus";
import CreateOrder from "./src/screens/CreateOrder";
import { Provider } from "react-redux";
import store from "./src/store";
import Login from "./src/screens/Login";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function StackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Orders" component={OrderList} />
        <Stack.Screen name="CreateOrder" component={CreateOrder} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
      </Stack.Navigator>
    );
  }

  function StackOrders() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="OrderDetail" component={OrderList} />
        <Stack.Screen name="QrPage" component={QrCode} />
        <Stack.Screen name="StatusOrder" component={OrderStatus} />
      </Stack.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home";
              } else if (route.name === "Orders") {
                iconName = focused ? "ios-list" : "ios-list";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            component={StackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Orders"
            component={StackOrders}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
