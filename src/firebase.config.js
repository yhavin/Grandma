import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtIuSS-cuOXcFJKnpIuotd5ccfSyqmej8",
  authDomain: "grandma-f7eb8.firebaseapp.com",
  projectId: "grandma-f7eb8",
  storageBucket: "grandma-f7eb8.appspot.com",
  messagingSenderId: "662663506364",
  appId: "1:662663506364:web:dcb4da067359dd55a4e3b9",
  measurementId: "G-19GRYKPNDT"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };