// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtujTSob6Dv5OepqzchVHlbnpQBzQwKIk",
  authDomain: "misemart-69323.firebaseapp.com",
  projectId: "misemart-69323",
  storageBucket: "misemart-69323.appspot.com",
  messagingSenderId: "268445937413",
  appId: "1:268445937413:web:5117d3ea1ab02fe7b9d16c",
  measurementId: "G-Z0K7ST38SC",
};

const app = initializeApp(firebaseConfig);
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
  }
});

export const provider = new GoogleAuthProvider();
