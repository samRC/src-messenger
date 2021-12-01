import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
} from "firebase/auth";
// import {getFirestore} from 'firebase/firestore';
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <div className="App">
      <h1>src-messenger</h1>
      {user ? (
        <div>
          <h2>logged in as {JSON.stringify(user)}</h2>
          <LogOut />
        </div>
      ) : (
        <div>
          <h2>logged out</h2> <LogIn />
        </div>
      )}
    </div>
  );
}

function LogIn() {
  /* Creates a new anon account (Sign up) */
  const signInAnon = () => {
    signInAnonymously(auth);
  };
  return <button onClick={signInAnon}> Sign In</button>;
}

function LogOut() {
  /* Signing out of Anon and signing back in again causes a new anon Id to be created without deleting the old one */
  const signOutAnon = () => {
    signOut(auth);
  };
  return <button onClick={signOutAnon}> Sign Out</button>;
}

export default App;
