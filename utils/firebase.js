// utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDKuD9mI4eOO7u7FcKbQRvApGi0o9wbi-M",
  authDomain: "fixit-25355.firebaseapp.com",
  projectId: "fixit-25355",
  storageBucket: "fixit-25355.firebasestorage.app",
  messagingSenderId: "1092759126226",
  appId: "1:1092759126226:web:b1e291116f619c152b6d0b",
  measurementId: "G-RG3Q061P7S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
