/* eslint-disable import/prefer-default-export */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyBMo6buyhMrTvbO9pM3ia1c9zL0G_3s9Wc',
  authDomain: 'library-5d787.firebaseapp.com',
  projectId: 'library-5d787',
  storageBucket: 'library-5d787.appspot.com',
  messagingSenderId: '962342888621',
  appId: '1:962342888621:web:2374d77acb3fe46c991224',
});

export const auth = getAuth(app);
export const db = getFirestore(app);
