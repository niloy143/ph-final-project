import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase-init';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

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

    const logOut = () => signOut(auth);
    const googleSignIn = () => signInWithPopup(auth, googleProvider);
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const setName = name => updateProfile(auth.currentUser, { displayName: name });

    const value = {
        user,
        userLoading,
        googleSignIn,
        logOut,
        createUser,
        setName
    }

    return (
        <PhContext.Provider value={value}>
            {children}
        </PhContext.Provider>
    );
};

export default Contexts;