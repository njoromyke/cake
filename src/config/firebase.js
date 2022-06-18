import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIs_zuHH-dUO1H4HQPS7OXfRY9hCk5BnI",
  authDomain: "cake-d6b02.firebaseapp.com",
  projectId: "cake-d6b02",
  storageBucket: "cake-d6b02.appspot.com",
  messagingSenderId: "466704150476",
  appId: "1:466704150476:web:b917c67f071a49c67a7769",
  measurementId: "G-4CYJRC1NY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
