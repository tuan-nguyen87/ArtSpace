import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
//Val added 'collection'-used to create a reference to a firestore collection
//Also added 'onSnapshot'-used to listen for real-time updates in "messages" collection
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging"; //Val


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
const messaging = getMessaging(app);//Val

//Vals code for messaging starting here:
// Listen for changes in the "messages" collection
const messagesRef = collection(db, "messages");

// Set up a real-time listener
const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added" || change.type === "modified") {
      const message = change.doc.data();
      // Handle the new or modified message
      console.log("New or modified message:", message);
      // Trigger a function to update the UI with the new message
    }
  });
});



const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log('Notification permission granted.');

      // Retrieve FCM token
      const currentToken = await getToken(messaging);
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        sendTokenToServer(currentToken); // Send the token to your server
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } else {
      console.log('Notification permission denied.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token:', err);
  }
};

const sendTokenToServer = (token) => {
  // Replace this with your server endpoint to send the FCM token
  // Example: You need to implement a server API to handle the FCM token
  fetch('https://your-server-endpoint.com/save-fcm-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send FCM token to server.');
      }
      console.log('FCM token sent to server successfully.');
    })
    .catch(error => {
      console.error('Error sending FCM token to server:', error);
    });
};

// Invoke the function to request permission and retrieve FCM token
requestPermission();
//Vals code  for messaging ends here

export { app, auth, db, messaging, requestPermission };
