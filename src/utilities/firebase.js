import { initializeApp } from 'firebase/app';
import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update} from 'firebase/database';

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