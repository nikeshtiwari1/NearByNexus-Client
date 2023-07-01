// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebase } from "firebase";
// import { getAnalytics } from "firebase/analytics";
firebase 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUHZoJXyaMM-1c4c5GpfC2YCtzSdjJLU8",
  authDomain: "nearbyneus.firebaseapp.com",
  projectId: "nearbyneus",
  storageBucket: "nearbyneus.appspot.com",
  messagingSenderId: "821092397881",
  appId: "1:821092397881:web:fdf07bb0bfc297c2656ee8",
  measurementId: "G-R03DGYGMF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
console.log("firebase inititalized");
const messaging = firebase.messaging();

messaging.requestPermission().then(()=>{
console.log("Per,ission Granted");
return messaging.getToken();
}).then((registrationToken) =>{
console.log("received geistration token", registrationToken);
// need to send this to api, to register fcm token to a user
}).catch((error)=>{
    console.log("Eror while obtaining device token", error)
});