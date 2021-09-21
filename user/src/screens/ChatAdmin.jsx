import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";

import firebase from "firebase";
import "firebase/firestore";

if (firebase.apps.length === 0) {
    firebase.initializeApp({
        apiKey: "AIzaSyACeEmupJZlCqYf8KADPS9nagdONxkqCrY",
        authDomain: "ez-laundr.firebaseapp.com",
        projectId: "ez-laundr",
        storageBucket: "ez-laundr.appspot.com",
        messagingSenderId: "86317751079",
        appId: "1:86317751079:web:bccfde6d3309c8daf76702",
        measurementId: "G-VE4QP8DJN5",
    });
}

const firestore = firebase.firestore();

export default function ChatAdmin() {
    const [formValue, setFormValue] = useState("");
    const [userId, setUserId] = useState("2");
    const test = firestore.collection("messages");
    const messagesRef = test.doc(userId).collection("chat-history");
    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages, setMessages] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            sender: "User1",
        });
        console.log(formValue);
        setFormValue("");
    };

    useEffect(() => {
        const unsubscribe = messagesRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === "added")
                .map(({ doc }) => {
                    const message = doc.data();
                    return {
                        ...message,
                        createdAt: message.createdAt.toDate(),
                    };
                });
            setMessages(messagesFirestore);
        });
    }, []);

    console.log(messages);

    return (
        <View>
            <Text>{userId}</Text>
            <TextInput
                onChangeText={(e) => setFormValue(e)}
                placeholder="Ketik pesan anda..."
            />
            <Button
                style={{ fontSize: 20, color: "green" }}
                styleDisabled={{ color: "red" }}
                title="Send"
                onPress={sendMessage}
            >
                Send
            </Button>
        </View>
    );
}
