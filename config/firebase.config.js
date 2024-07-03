// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);



// const storage = getStorage();
// const storageRef = ref(storage);


export {app, getStorage, ref, uploadBytes, getDownloadURL}