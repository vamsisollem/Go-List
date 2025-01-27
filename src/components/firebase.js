import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "",
  authDomain: "to-do-6ff71.firebaseapp.com",
  projectId: "to-do-6ff71",
  storageBucket: "to-do-6ff71.firebasestorage.app",
  messagingSenderId: "787367235498",
  appId: "1:787367235498:web:c523331c4eb27d890c65d3",
  measurementId: "G-J9M4DT5SEZ"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore
const db = getFirestore(app);
const auth = getAuth();
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

export { db, auth };