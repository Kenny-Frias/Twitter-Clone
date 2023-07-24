// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBtXGpvbfk8IdYfO1OLcbvhM7vjRSv_sUY",
    authDomain: "twitter-clone-kenny.firebaseapp.com",
    projectId: "twitter-clone-kenny",
    storageBucket: "twitter-clone-kenny.appspot.com",
    messagingSenderId: "757545832947",
    appId: "1:757545832947:web:0ff55215fc60b5ec6ec286",
    measurementId: "G-L7KDGT80D2"
  };

// Initialize Firebase. With Next.js, you must get app.
//If not using an app, initialize app. If not, use current app. 
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };