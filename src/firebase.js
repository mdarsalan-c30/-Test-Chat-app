// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCay-qQE11Ssv6zWxTxszs4wVdMUADt8qo",
//   authDomain: "chat-fb538.firebaseapp.com",
//   projectId: "chat-fb538",
//   storageBucket: "chat-fb538.appspot.com",
//   messagingSenderId: "229491091487",
//   appId: "1:229491091487:web:363f9a17c5980d284bcd2a"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyDQVA5P9G082V03BThGDyEauGXwzM3z6Tg",
//   authDomain: "chat-app-3206b.firebaseapp.com",
//   projectId: "chat-app-3206b",
//   storageBucket: "chat-app-3206b.appspot.com",
//   messagingSenderId: "164722517386",
//   appId: "1:164722517386:web:229938d4d2f7badada5473"
// };


const firebaseConfig = {
  apiKey: "AIzaSyDF6WbwZVWQ4umULLJaIg5GGrjzGWzkPg0",
  authDomain: "chatapp-a0527.firebaseapp.com",
  projectId: "chatapp-a0527",
  storageBucket: "chatapp-a0527.appspot.com",
  messagingSenderId: "274569263810",
  appId: "1:274569263810:web:d150f4541dd46eac3ad95b",
  measurementId: "G-TGNQKPJF0Q"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth() 
export const storage = getStorage();
export const db = getFirestore();