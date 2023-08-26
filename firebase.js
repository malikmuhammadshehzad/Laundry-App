 import {getAuth} from "firebase/auth"
 import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
 
const firebaseConfig = {
  apiKey: "AIzaSyCtQXixyyy5l1b2OpbtX_K3gMFKyY9dw_4",
  authDomain: "laundry-application-cddd4.firebaseapp.com",
  projectId: "laundry-application-cddd4",
  storageBucket: "laundry-application-cddd4.appspot.com",
  messagingSenderId: "1051045374657",
  appId: "1:1051045374657:web:f1941cd1b2dae9176a4240"
};
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);

  const db =getFirestore();

  export {auth , db };