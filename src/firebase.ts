import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyC5EnBWVkYTA9lj8UoofSB7qAa8prAAQ18",
  authDomain: "nwitter-reloaded-b028a.firebaseapp.com",
  projectId: "nwitter-reloaded-b028a",
  storageBucket: "nwitter-reloaded-b028a.appspot.com",
  messagingSenderId: "445177327513",
  appId: "1:445177327513:web:49e432da9c0a9a519b6d08"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
