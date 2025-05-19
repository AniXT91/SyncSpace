import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}  from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "syncspace-bc251.firebaseapp.com",
  projectId: "syncspace-bc251",
  storageBucket: "syncspace-bc251.firebasestorage.app",
  messagingSenderId: "638615891969",
  appId: "1:638615891969:web:680c180878ee2bde181000",
  measurementId: "G-E0B7Y6RCYR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  

if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
