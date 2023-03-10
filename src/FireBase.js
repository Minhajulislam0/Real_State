// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByIJLBvx38joZI4iGxji0Ipc3MV9cRjWU",
  authDomain: "realstate-44a4c.firebaseapp.com",
  projectId: "realstate-44a4c",
  storageBucket: "realstate-44a4c.appspot.com",
  messagingSenderId: "933069874233",
  appId: "1:933069874233:web:a4e8beaabb1366078f19e8",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// export db(data base)
export const db = getFirestore();
