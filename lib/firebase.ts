import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAnJaSatPe4M1xNYS0xAd5lNPZqOlgOius",
  authDomain: "dashboard-f9f61.firebaseapp.com",
  projectId: "dashboard-f9f61",
  storageBucket: "dashboard-f9f61.firebasestorage.app",
  messagingSenderId: "22044177214",
  appId: "1:22044177214:web:73dd9f37071127b1d9f26f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);