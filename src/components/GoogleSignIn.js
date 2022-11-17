import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { PhContext } from '../Contexts/Contexts';
import useToken from '../Hooks/useToken';
import ButtonSpinner from './ButtonSpinner';

const GoogleSignIn = ({ loading, setLoading }) => {
    const [googleLoading, setGoogleLoading] = useState(false);
    const { googleSignIn } = useContext(PhContext);
    const [loggedUser, setLoggedUser] = useState(null);
    useToken(loggedUser, setLoading);

    const handleGoogleSignIn = () => {
        setGoogleLoading(true);
        setLoading(true);
        googleSignIn()
            .then(result => {
                const { displayName, email, uid } = result.user;
                setLoggedUser({ displayName, email, uid });
            })
            .catch(() => {
                setLoading(false)
                setGoogleLoading(false)
            })
    }

    return (
        <button className={`flex items-center gap-2 sm:text-lg font-semibold border rounded-lg shadow w-full p-3 sm:px-6 uppercase ${googleLoading ? 'text-black/25' : 'active:scale-95'} transition justify-center`} disabled={googleLoading} onClick={handleGoogleSignIn}>
            {
                googleLoading ? <ButtonSpinner /> : <FcGoogle className='text-2xl' />
            }
            <span>Continue With Google</span>
        </button>
    );
};

export default GoogleSignIn;