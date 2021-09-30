import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore'

firebase.initializeApp(
    {
        apiKey: "AIzaSyCQ3RJ_yhhl8147mxgVhMO9pCnKf3Qs5xg",
        authDomain: "reels-35739.firebaseapp.com",
        projectId: "reels-35739",
        storageBucket: "reels-35739.appspot.com",
        messagingSenderId: "12546295130",
        appId: "1:12546295130:web:3f791182e16389bdcb5f63"
    }
)

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();