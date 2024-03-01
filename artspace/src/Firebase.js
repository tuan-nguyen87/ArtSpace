// Import functions needed from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFn9e9O9Gtjc-_qcg1Bs9_cWU1WpfivN4",
  authDomain: "artspace-491.firebaseapp.com",

  projectId: "artspace-491",
  storageBucket: "artspace-491.appspot.com",
  messagingSenderId: "54385371382",
  appId: "1:54385371382:web:09b9e4090451b47f4664d7",
  measurementId: "G-YHZJQE1L7C",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messaging = getMessaging(app);
const auth = getAuth(app);

export { app, auth };
