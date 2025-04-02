// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCplDSMe15EkTdozHGDNYXeBkJu1YhKzKE",
  authDomain: "fitvue-7757e.firebaseapp.com",
  projectId: "fitvue-7757e",
  storageBucket: "fitvue-7757e.firebasestorage.app",
  messagingSenderId: "603467004329",
  appId: "1:603467004329:web:647cedb63fba4019452cb8",
  measurementId: "G-J97MSTDQYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { auth }
