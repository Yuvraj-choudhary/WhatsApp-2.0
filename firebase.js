import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCEYluMaJ2xzlj_C-Kw7-ayRYTw93hqPI4",
  authDomain: "whatsapp2-7f731.firebaseapp.com",
  projectId: "whatsapp2-7f731",
  storageBucket: "whatsapp2-7f731.appspot.com",
  messagingSenderId: "254233906615",
  appId: "1:254233906615:web:5166067c6a832fb36fac32",
  measurementId: "G-0ZQRJX4GE1",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
