import firebase from "firebase";

class Fire {
    constructor() {
        this.init();
    }

    init = () => {
        if (firebase.apps.length) {
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
    };

    send = (messages) => {
        messages.forEach((message) => {
            const msg = {
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                sender: "Admin",
            };
            this.db.push(msg);
        });
    };

    get db() {
        return firestore.collection("messages");
    }
}

export default new Fire();
