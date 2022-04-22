import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyC69WrB0PiGrR1AzMGALy-5HnVH3rg3OqM",
    authDomain: "auth-a3a50.firebaseapp.com",
    projectId: "auth-a3a50",
    storageBucket: "auth-a3a50.appspot.com",
    messagingSenderId: "137373094362",
    appId: "1:137373094362:web:f30f93110ab715f1a370e3"
};
// Initialize Firebase

const firebaseApp =  firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider,firebaseApp};
export default db;


