// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2jn5IuDN1Kv6QEYrRy6CAMXY4OpdVl3c',
  authDomain: 'vue-bookkeeping-62472.firebaseapp.com',
  projectId: 'vue-bookkeeping-62472',
  storageBucket: 'vue-bookkeeping-62472.appspot.com',
  messagingSenderId: '636792881384',
  appId: '1:636792881384:web:8e68fdde65bf2e7cd1895d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db, auth };
