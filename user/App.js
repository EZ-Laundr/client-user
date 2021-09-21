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
import Splash from "./src/screens/Splash";
import Wellcome from "./src/screens/Wellcome";
import { Provider as PaperProvider } from "react-native-paper";
import Register from "./src/screens/Register";
import PaymentGateway from "./src/screens/PaymentGateway";
import Map from "./src/screens/Map";
import Dummy from "./src/screens/dummy";
import ChatAdmin from "./src/screens/ChatAdmin";

export default function App() {
	const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();

	function StackHome() {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Splash"
					options={{
						headerShown: false,
					}}
					component={Splash}
				/>
				<Stack.Screen
					name="Wellcome"
					options={{
						headerShown: false,
					}}
					component={Wellcome}
				/>
				<Stack.Screen name="Dummy" component={Dummy} />
				<Stack.Screen name="Chat Admin" component={ChatAdmin} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen
					name="Login"
					options={{
						headerShown: false,
					}}
					component={Login}
				/>
				<Stack.Screen
					name="Ez Loundr"
					component={Home}
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen name="Create Order" component={CreateOrder} />
				<Stack.Screen name="Cart" component={Cart} />
				<Stack.Screen name="Order Completed" component={OrderCompleted} />
				<Stack.Screen name="Map" component={Map} />
			</Stack.Navigator>
		);
	}

	function StackOrders() {
		return (
			<Stack.Navigator>
				<Stack.Screen name="Order List" component={OrderList} />
				<Stack.Screen name="Order Detail" component={QrCode} />
				<Stack.Screen name="Midtrans" component={PaymentGateway} />
				<Stack.Screen name="StatusOrder" component={OrderStatus} />
				<Stack.Screen name="Map" component={Map} />
			</Stack.Navigator>
		);
	}

	return (
		<Provider store={store}>
			<PaperProvider>
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
							tabBarActiveTintColor: "blue",
							tabBarInactiveTintColor: "gray",
						})}
					>
						<Tab.Screen
							name="Home"
							component={StackHome}
							options={{ headerShown: false }}
						/>
						<Tab.Screen
							name="Orders"
							component={StackOrders}
							options={{ headerShown: false }}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</PaperProvider>
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
