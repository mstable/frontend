import { initializeApp } from 'firebase/app';

const firebaseConfig = Object.freeze({
  apiKey: 'AIzaSyCTHewGXSG63A4U90BME7ywVf11W5d8Ks0',
  authDomain: 'frontend-7e17f.firebaseapp.com',
  projectId: 'frontend-7e17f',
  storageBucket: 'frontend-7e17f.appspot.com',
  messagingSenderId: '907321051507',
  appId: '1:907321051507:web:b94f6ecbb3316069f3dd06',
  measurementId: 'G-KYQ5RJCN8K',
});
export const firebaseApp = initializeApp(firebaseConfig);
