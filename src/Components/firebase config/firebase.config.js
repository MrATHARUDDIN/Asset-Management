// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByzBEiJHfB4c0wsAoTPx1rPz8sdwXZdG0",
  authDomain: "asset-management-a12.firebaseapp.com",
  projectId: "asset-management-a12",
  storageBucket: "asset-management-a12.appspot.com",
  messagingSenderId: "644797622611",
  appId: "1:644797622611:web:930b12d79b5d970b5f19a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;