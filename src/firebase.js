import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Royal Rinse Firebase Configuration
// If you are deploying to a different Firebase Project, replace these placeholders 
// with the config object from your Firebase Console -> Project Settings -> General
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD8CoE-p1zKRGyencuGX2yLRI5NdN8U4QI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "royal-rinse-laundry.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "royal-rinse-laundry",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "royal-rinse-laundry.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "494704998508",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:494704998508:web:5c043f5f699a713114c049",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Q526BPVEFR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default db;
