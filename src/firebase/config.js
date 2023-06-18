import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC48KjfwlBhfjXUwqN9bz06aVAIaD5oiVU",
    authDomain: "the-dojo-d28ee.firebaseapp.com",
    projectId: "the-dojo-d28ee",
    storageBucket: "the-dojo-d28ee.appspot.com",
    messagingSenderId: "685205580460",
    appId: "1:685205580460:web:e81fb9f6605986fcc9cd09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
