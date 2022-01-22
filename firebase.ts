// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);
export const auth = getAuth();
