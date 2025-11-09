// ✅ Firebase configuration setup
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config (from console)
const firebaseConfig = {
  apiKey: "AIzaSyAno-8mTY-lcwSJP59UR8xc4Q11QvrT61s",
  authDomain: "portal-5ca14.firebaseapp.com",
  projectId: "portal-5ca14",
  storageBucket: "portal-5ca14.firebasestorage.app",
  messagingSenderId: "423005186117",
  appId: "1:423005186117:web:6872aeb4ef6a979ef2db2c",
  measurementId: "G-87MD02T55J",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication
const auth = getAuth(app);

// ✅ Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ✅ Export all
export { app, auth, googleProvider };
