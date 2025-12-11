// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX3-2106y5YMIflaHlXbZ5Lo_bwLzimvU",
  authDomain: "week9-demo-b696d.firebaseapp.com",
  projectId: "week9-demo-b696d",
  storageBucket: "week9-demo-b696d.firebasestorage.app",
  messagingSenderId: "22788054242",
  appId: "1:22788054242:web:00707b7f5707052817d2bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
