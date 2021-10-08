import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCWyZLXHWimGLoKEIpy1eJhxCvlq2xdSM",
  authDomain: "like-trackers.firebaseapp.com",
  databaseURL: "https://like-trackers-default-rtdb.firebaseio.com",
  projectId: "like-trackers",
  storageBucket: "like-trackers.appspot.com",
  messagingSenderId: "1089063642969",
  appId: "1:1089063642969:web:cedcdf89f48c756dd54e48",
  measurementId: "G-LP1YSZVG5M",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
