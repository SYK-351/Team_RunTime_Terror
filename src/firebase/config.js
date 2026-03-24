import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace these with your actual Firebase project settings
// For the demo/hackathon, users will need to add these to a .env local file
const firebaseConfig = {
  apiKey: "AIzaSyAfy77E88IVhZ8F0WaUTjg9feVS1IG9Xas",
  authDomain: "event-hub-d8fae.firebaseapp.com",
  projectId: "event-hub-d8fae",
  storageBucket: "event-hub-d8fae.firebasestorage.app",
  messagingSenderId: "825926996190",
  appId: "1:825926996190:web:6750b6bed7a17d09f9324f",
  measurementId: "G-WCLM8DMTKZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
