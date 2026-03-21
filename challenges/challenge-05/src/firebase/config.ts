import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);