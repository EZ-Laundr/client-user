import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import base64 from "base-64";
import { FontAwesome } from "@expo/vector-icons";
import Layout from "../components/LayoutMIdtrans";
export default function App({ route }) {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const { order } = route.params;
  const serverKey = "SB-Mid-server-qPfv763v-8yrPbfvAgrgZsMw:";
  const base64Key = base64.encode(serverKey);

  const orderID = "sahjdgsajhdg21863"; //order id nanti diganti

  useEffect(() => {
    midtrans().then((data) => {
      setTransactions(data);
      if (data.error_messages) {
        console.log(data);
        alert("This Order ID has been paid");
      }
    });
  }, []);

  async function midtrans(user) {
    const url = "https://app.sandbox.midtrans.com/snap/v1/transactions";

    const data = {
      transaction_details: {
        order_id: orderID,
        gross_amount: 48000,
      },
      item_details: [
        {
          id: "PRODUCTID1",
          price: 6000,
          quantity: 1,
          name: "Service",
          category: "Clothes",
          merchant_name: "Merchant",
        },
        {
          id: "PRODUCTID2",
          price: 2000,
          quantity: 1,
          name: "Perfume",
          category: "Clothes",
          merchant_name: "Merchant",
        },
        {
          id: "PRODUCTID2",
          price: 40000,
          quantity: 1,
          name: "Extra Order",
          category: "Clothes",
          merchant_name: "Merchant",
        },
      ],
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "budi",
        last_name: "pratama",
        email: "budi.pra@example.com",
        phone: "08111222333",
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + base64Key,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async function getstatus() {
    //status transaksi
    const url = `https://api.sandbox.midtrans.com/v2/${orderID}/status`;

    // fetch data
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + base64Key,
      },
    });
    return response.json();
  }

  function checkPayment() {
    setLoading(true);
    getstatus().then((data) => {
      if (data.status_code == 200) {
        console.log(data);
        setLoading(false);
        alert("This Order ID has been paid");
      } else {
        console.log(data);
        setLoading(false);
        alert("This Order ID has not been paid");
      }
    });
  }

  return (
    <Layout>
      {!transactions ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ) : (
        <>
          <WebView
            source={{
              uri: transactions.redirect_url,
            }}
            style={{ flex: 1 }}
          />

          <TouchableOpacity
            onPress={() => {
              checkPayment();
            }}
            style={{
              backgroundColor: "#3366FF",
              padding: 20,
              paddingVertical: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            disabled={loading}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Cek Pembayaran
            </Text>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <FontAwesome name="check-square" size={20} color="white" />
            )}
          </TouchableOpacity>
        </>
      )}
    </Layout>
  );
}
