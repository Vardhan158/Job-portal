// ✅ Firebase configuration setup
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config (from console)
const firebaseConfig = {
  apiKey: "AIzaSyD167tZXRrqZ4NSxu4gRduD5O82xC1Fyuo",
  authDomain: "jobselection-b0ed4.firebaseapp.com",
  projectId: "jobselection-b0ed4",
  storageBucket: "jobselection-b0ed4.firebasestorage.app",
  messagingSenderId: "367358582699",
  appId: "1:367358582699:web:53c952fcd3c45b90403cee",
  measurementId: "G-M27G27H8G1",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication
const auth = getAuth(app);

// ✅ Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ✅ Export all
export { app, auth, googleProvider };
