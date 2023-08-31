import { initializeApp } from 'firebase/app';

const firebaseConfig = Object.freeze({
  apiKey: 'AIzaSyBi3nU0ysQmIqPHumwSaaUzxq8i9xOuP_c',
  authDomain: 'apps-lts.firebaseapp.com',
  projectId: 'apps-lts',
  storageBucket: 'apps-lts.appspot.com',
  messagingSenderId: '558241704832',
  appId: '1:558241704832:web:baad7ec7c6061efdd32f65',
  measurementId: 'G-R1530ER4M9',
});
export const firebaseApp = initializeApp(firebaseConfig);
