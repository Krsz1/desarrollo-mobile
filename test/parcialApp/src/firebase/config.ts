import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBNPk3HWoRFO69s5hddx3lslqV8mQdi1U",
  authDomain: "challenge-05-33992.firebaseapp.com",
  projectId: "challenge-05-33992",
  storageBucket: "challenge-05-33992.firebasestorage.app",
  messagingSenderId: "526275905114",
  appId: "1:526275905114:web:8a464ec213a8ebcd4fba63",
  measurementId: "G-33N3R0MNY1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
});