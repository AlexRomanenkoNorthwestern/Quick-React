import { initializeApp } from 'firebase/app';
import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, connectAuthEmulator, signInWithCredential } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCnOP_A9s4TZMkObhBwI8KRdNONT8-2xzM",
    authDomain: "quick-react-b6de6.firebaseapp.com",
    databaseURL: "https://quick-react-b6de6-default-rtdb.firebaseio.com",
    projectId: "quick-react-b6de6",
    storageBucket: "quick-react-b6de6.appspot.com",
    messagingSenderId: "1044840440533",
    appId: "1:1044840440533:web:d7f196aff5a6552b6d385c",
    measurementId: "G-2QXHR1GS4R"
  };
  
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const database = getDatabase(firebase);

const auth = getAuth(firebase);

if (import.meta.env.NODE_ENV !== 'production'){
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectDatabaseEmulator(database, "127.0.0.1", 9000);
  
    //console.log("connected")
    signInWithCredential(auth, GoogleAuthProvider.credential(
      '{"sub": "2Bqd9Ejz9W7gihKsDlb0oup2c1F1", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
    ));
}


export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };
  
  const firebaseSignOut = () => signOut(auth);
  
  export { firebaseSignOut as signOut };
  
  export const useAuthState = () => {
    const [user, setUser] = useState();
    
    useEffect(() => (
      onAuthStateChanged(auth, setUser)
    ), []);
  
    console.log(user);
    return [user];
  };

