// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtWUC9uBduoRVnT8Vpk5LSOwxgu6VOq1c",
  authDomain: "gigsman-b447c.firebaseapp.com",
  projectId: "gigsman-b447c",
  storageBucket: "gigsman-b447c.firebasestorage.app",
  messagingSenderId: "776842726812",
  appId: "1:776842726812:web:69ceb4ae0d2549e7114c59",
  measurementId: "G-VWK8WVTXGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);