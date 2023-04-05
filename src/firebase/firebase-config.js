// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq1bdHaX4z57_Ucp1kpHseHwzf6896zoQ",
  authDomain: "dented-95704.firebaseapp.com",
  projectId: "dented-95704",
  storageBucket: "dented-95704.appspot.com",
  messagingSenderId: "582422595560",
  appId: "1:582422595560:web:50b900afdfd3b5a527065d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ENABLING SERVICES
export const auth = getAuth(app);
export const db = getFirestore(app);
