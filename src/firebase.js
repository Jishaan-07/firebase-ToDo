import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABAOY-IL3ezyl42KdwMQHMPZzgrtbLv9E",
  authDomain: "todo-list-cccb0.firebaseapp.com",
  projectId: "todo-list-cccb0",
  storageBucket: "todo-list-cccb0.firebasestorage.app",
  messagingSenderId: "713435856169",
  appId: "1:713435856169:web:50cb97cea84206d2b88b38",
  measurementId: "G-BCRVEY57V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
