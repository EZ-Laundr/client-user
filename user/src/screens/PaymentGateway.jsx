import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import base64 from "base-64";
import { FontAwesome } from "@expo/vector-icons";
import Layout from "../components/LayoutMIdtrans";
export default function PaymentGateway({ route }) {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const { order } = route.params;
  const serverKey = "SB-Mid-server-qPfv763v-8yrPbfvAgrgZsMw:";
  const base64Key = base64.encode(serverKey);

  const orderID = order.codeTransaction; //order id nanti diganti

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
    let item_details;
    let detailService = {
      id: order.Service.id,
      price: order.Service.price,
      weight: order.weight,
      quantity: 1,
      name: order.Service.name,
      category: "Service",
      merchant_name: "Ez_Loundr",
    };

    let detailPerfume = {
      id: order.Perfume.id,
      price: order.Perfume.price,
      quantity: 1,
      name: order.Perfume.name,
      category: "Perfume",
      merchant_name: "Ez_Loundr",
    };

    let treatments = order.OrderSpecials.map((treat) => {
      return treat;
    });

    item_details = treatments.map((item) => {
      return {
        id: item.SpecialTreatment.id,
        price: item.price / item.quantity,
        quantity: item.quantity,
        name: item.SpecialTreatment.name,
        category: "Extra Order",
        merchant_name: "Ez_Loundr",
      };
    });

    item_details.push(detailService);
    item_details.push(detailPerfume);

    const data = {
      transaction_details: {
        order_id: orderID,
        gross_amount: order.totalPrice + order.Service.price,
        // gross_amount: order.totalPrice,
      },
      item_details,
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: order.User.email,
        phone: order.User.phoneNumber,
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
    console.log(response, "<<<<<<<<<<<<< response");
    return response.json();
  }

  function checkPayment() {
    setLoading(true);
    getstatus().then((data) => {
      console.log(data, "sebelummm");
      if (data.status_code == 200) {
        setLoading(false);
        alert("This Order ID has been paid");
        console.log(data, " di getsatus");
      } else {
        console.log(data, " <<<<<<<<<<<<<<<< di getsatus");
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
          {console.log(order, "sebelummm")}
          <WebView
            source={{
              uri: transactions.redirect_url,
            }}
            style={{ flex: 1 }}
          />
        </>
      )}
    </Layout>
  );
}
