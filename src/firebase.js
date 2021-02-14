import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA1KAJbuBuziBrbH43c_JrA66aXlRCEpYE",
    authDomain: "todo-list-9b878.firebaseapp.com",
    projectId: "todo-list-9b878",
    storageBucket: "todo-list-9b878.appspot.com",
    messagingSenderId: "248781568741",
    appId: "1:248781568741:web:59a1a09d158b0a0b1ab20c"
  };

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();

export { db, provider, auth };