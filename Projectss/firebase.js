
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpYrCHCHmXCABHc6WmTybcHg0pyHIP2CA",
  authDomain: "webproject-956bd.firebaseapp.com",
  projectId: "webproject-956bd",
  storageBucket: "webproject-956bd.firebasestorage.app",
  messagingSenderId: "381564991802",
  appId: "1:381564991802:web:20514c408aed634b8cb803",
  measurementId: "G-BNGP7D4B24"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase initialized successfully");

export { db };