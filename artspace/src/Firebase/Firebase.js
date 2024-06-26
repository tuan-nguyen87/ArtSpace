import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcdvsv5A7UYztefSH1i3azm_YTPYmLnCU",
  authDomain: "user-signin-b205b.firebaseapp.com",
  projectId: "user-signin-b205b",
  storageBucket: "user-signin-b205b.appspot.com",
  messagingSenderId: "896905746270",
  appId: "1:896905746270:web:ba9006c07ca56c49dea1cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

onAuthStateChanged(
  auth,
  (user) => {
    if (user) {
      // User is signed in
      console.log("User is signed in:", user.email);
    } else {
      // User is signed out
      console.log("User is signed out");
      // can update the UI or take actions when the user is signed out
    }
  },
  (error) => {
    console.error("Auth state change error:", error);
  }
);

export { app, auth, db, storage };
