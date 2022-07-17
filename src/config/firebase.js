import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyC7vAAHh8Fxf1zm8rObAkEmfXiUpByqQUM",
  authDomain: "auth-7a3fb.firebaseapp.com",
  projectId: "auth-7a3fb",
  storageBucket: "auth-7a3fb.appspot.com",
  messagingSenderId: "404624057718",
  appId: "1:404624057718:web:ec8a7070d2d88dec424657"
})

export const auth = app.auth()
export default app
