import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBFZFQlK6EecWKupkCFmoeLKA5u7bP1N38',
  authDomain: 'uploadingimage-71d87.firebaseapp.com',
  databaseURL: 'https://uploadingimage-71d87-default-rtdb.firebaseio.com',
  projectId: 'uploadingimage-71d87',
  storageBucket: 'uploadingimage-71d87.appspot.com',
  messagingSenderId: '1079793753064',
  appId: '1:1079793753064:web:b624ad190fe7c3f83da25d',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebase = getFirestore(firebaseApp);

export default firebase;
