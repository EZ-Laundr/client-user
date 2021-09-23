// @refresh reset
import React, { useState, useEffect, useCallback } from "react";
import { LogBox } from "react-native";
import { useSelector } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";

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
LogBox.ignoreLogs([
  "Setting a timer for a long period of time",
  "Warning: Encountered two children with the same key, `undefined`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
]);
export default function ChatAdmin() {
  const { userId } = useSelector((state) => state.reducer);
  const test = firestore.collection("messages");
  const messagesRef = test.doc(userId).collection("chat-history");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  async function handleSend(messages) {
    const writes = messages.map((m) => {
      messagesRef.add(m);
    });
    await Promise.all(writes);
  }

  const user = {
    _id: 1,
    user: userId,
    name: userId,
  };

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  useEffect(() => {
    const unsubscribe = messagesRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .map(({ doc }) => {
          const message = doc.data();
          return {
            ...message,
            createdAt: message.createdAt.toDate(),
            _id: doc.id,
          };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
  }, []);

  return (
    <GiftedChat
      renderUsernameOnMessage={true}
      messages={messages}
      user={user}
      onSend={handleSend}
    />
  );
}
