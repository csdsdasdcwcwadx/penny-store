// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, EmailAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpxm_FeqO6_hFf8H4DZBR-vK-cx6U4klg",
  authDomain: "penny-store.firebaseapp.com",
  projectId: "penny-store",
  storageBucket: "penny-store.appspot.com",
  messagingSenderId: "729566084235",
  appId: "1:729566084235:web:8b3683c6fd90178512a88e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const MailProvider = new EmailAuthProvider();
export const FacebookProvider = new FacebookAuthProvider();

export enum E_auth {
  google = 'google',
  facebook = 'facebook',
}
