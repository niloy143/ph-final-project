import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase-init';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const PhContext = createContext({});
const auth = getAuth(app);

const Contexts = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider(auth);

    useEffect(() => {
        const cancel = onAuthStateChanged(auth, user => {
            setUser(user);
            setUserLoading(false);
            console.log(user);
        });
        return () => cancel();
    }, [])

    const logOut = () => {
        localStorage.removeItem('doctors-portal-token');
        return signOut(auth);
    };
    const emailSignIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const googleSignIn = () => signInWithPopup(auth, googleProvider);
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const setName = name => updateProfile(auth.currentUser, { displayName: name });
    const forgotPass = email => sendPasswordResetEmail(auth, email);

    const value = {
        user,
        userLoading,
        emailSignIn,
        googleSignIn,
        logOut,
        createUser,
        setName,
        forgotPass
    }

    return (
        <PhContext.Provider value={value}>
            {children}
        </PhContext.Provider>
    );
};

export default Contexts;