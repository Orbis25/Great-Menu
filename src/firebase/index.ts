import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from "./config.json";

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

export const storage = {
  food: "images/foods",
};

// Initialize Firebase
export const initialize = firebase.initializeApp(firebaseConfig);
