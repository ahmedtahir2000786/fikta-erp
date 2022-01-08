import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyD55gLj5kM1s0W2cZ0_QaLHIv_4U0oRaaE",
  authDomain: "data-entry-41ff4.firebaseapp.com",
  projectId: "data-entry-41ff4",
  storageBucket: "data-entry-41ff4.appspot.com",
  messagingSenderId: "608215763969",
  appId: "1:608215763969:web:6a55fe44c20e2e3de94400",
  measurementId: "G-PZCVR5J2CW",
  databaseURL: "https://data-entry-41ff4-default-rtdb.firebaseio.com/"
};



  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);