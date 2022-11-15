import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { PhContext } from '../Contexts/Contexts';
import ButtonSpinner from './ButtonSpinner';

const GoogleSignIn = () => {
    const [googleLoading, setGoogleLoading] = useState(false);
    const { googleSignIn } = useContext(PhContext);

    const handleGoogleSignIn = () => {
        setGoogleLoading(true);
        googleSignIn()
            .then(() => { })
            .catch(() => { })
            .finally(() => setGoogleLoading(false))
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