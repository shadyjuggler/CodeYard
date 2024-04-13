import { initializeApp } from 'firebase/app';
import { getAuth,  } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKgY83X6TF_3OWKBe4_XfxAmTk2miKR2g",
    authDomain: "codeyard-77bce.firebaseapp.com",
    projectId: "codeyard-77bce",
    storageBucket: "codeyard-77bce.appspot.com",
    messagingSenderId: "683464532096",
    appId: "1:683464532096:web:96d2bfb62366ba0c2d4665"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


console.log(auth.currentUser);
