import { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    });
firebase.analytics();

const auth = firebase.auth();
const firestore = firebase.firestore();

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const [user] = useAuthState(auth);
    return (
        <FirebaseContext.Provider value={{ firebase, user, auth, firestore }}>
            {children}
        </FirebaseContext.Provider>
    );
};
