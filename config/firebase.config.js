import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getAuth, onAuthStateChanged, } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU7hqMF6Ht4SuTv8XN6bN0t2kwkwZSk9w",
  authDomain: "gymbro-4d0a0.firebaseapp.com",
  projectId: "gymbro-4d0a0",
  storageBucket: "gymbro-4d0a0.appspot.com",
  messagingSenderId: "305034893212",
  appId: "1:305034893212:web:030440d14256ae04819a59",
  measurementId: "G-QM2194YT98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth = getAuth(app);
let storage = getStorage(app);
// const analytics = getAnalytics(app);


export {app, auth, storage, onAuthStateChanged, ref, uploadBytes, getDownloadURL, listAll }