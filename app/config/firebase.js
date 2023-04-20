import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7hq5fak0c2O-Bnw2OXdeKqZBId_fJfh8",
  authDomain: "jiauddin-eb04b.firebaseapp.com",
  projectId: "jiauddin-eb04b",
  storageBucket: "jiauddin-eb04b.appspot.com",
  messagingSenderId: "1092808689480",
  appId: "1:1092808689480:web:af1029b1963099e7cdd57d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, "trips");
export const expensesRef = collection(db, "expenses");

export default app;
