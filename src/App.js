import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import SignUp from "./components/SignUp";

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

function App() {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState(
    useMemo(() => {
      return window.localStorage.getItem("nickname");
    }, [])
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    signInAnonymously(auth).catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <h1>src-messenger</h1>
      {user && nickname && (
        <div>
          <p>
            Logged in as{" "}
            <strong>
              {nickname}#{user.uid.slice(0, 4)}
            </strong>
          </p>
        </div>
      )}
      {!nickname && (
        <div>
          <SignUp setNickname={setNickname} />
        </div>
      )}
    </div>
  );
}

export default App;
