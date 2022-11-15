import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { SpinnerRoundOutlined } from 'spinners-react';
import BodySpinner from '../../components/BodySpinner';
import ButtonSpinner from '../../components/ButtonSpinner';
import GoogleSignIn from '../../components/GoogleSignIn';
import { PhContext } from '../../Contexts/Contexts';

const Login = () => {
    const { user, userLoading, emailSignIn, forgotPass } = useContext(PhContext);
    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm();
    const [loggingIn, setLoggingIn] = useState(false);
    const [forgetting, setForgetting] = useState(false);
    const { state } = useLocation();

    const handleSignIn = ({ email, password }) => {
        setLoggingIn(true);
        emailSignIn(email, password)
            .then(() => { })
            .catch(err => {
                switch (err.code) {
                    case 'auth/user-not-found':
                        setError('email', {
                            type: 'authentication',
                            message: 'No user found with this email address.'
                        }); break;
                    case 'auth/wrong-password':
                        setError('password', {
                            type: 'authentication',
                            message: 'Wrong Password!'
                        }); break;
                    case 'auth/too-many-requests':
                        setError('password', {
                            type: 'authentication',
                            message: 'You entered wrong password several times. Try later.'
                        }); break;
                    default:
                }
            })
            .finally(() => setLoggingIn(false))
    }

    const handleForgotPass = () => {
        setForgetting(true);
        forgotPass(watch().email)
            .then(() => toast.success(`An email sent to ${watch().email}`))
            .catch(err => {
                switch (err.code) {
                    case 'auth/missing-email':
                        toast.error('Please enter your email address.'); break;
                    case 'auth/invalid-email':
                        toast.error('Please enter a valid email address.'); break;
                    case 'auth/user-not-found':
                        toast.error('No user found with this email address.'); break;
                    case 'auth/too-many-requests':
                        toast.error('Too many requests, try some minutes later.'); break;
                    default: console.error(err.code);
                }
            })
            .finally(() => setForgetting(false))
    }

    return (
        userLoading ? <BodySpinner /> : user && !loggingIn ? <Navigate to={state || '/'} /> : <div className='shadow rounded-xl px-6 py-12 max-w-lg mx-auto my-12 sm:my-24'>
            <h2 className='text-2xl font-semibold text-center pb-3'>Login</h2>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleSignIn)}>
                <div className="form-control">
                    <label className="label font-semibold"> Email </label>
                    <input type="email" placeholder="Your email" {
                        ...register('email', {
                            required: 'Please enter your email address.',
                            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/g, message: 'Please enter a valid email address.' }
                        })
                    } className={`input input-bordered ${errors.email && 'input-error'}`} />
                    {
                        errors.email && <label className='label label-text-alt text-red-600'>{errors.email.message}</label>
                    }
                </div>
                <div className="form-control">
                    <label className="label font-semibold"> Password </label>
                    <input type="password" placeholder="Your password" {
                        ...register('password', {
                            required: 'Please enter your password.'
                        })
                    } className={`input input-bordered ${errors.password && 'input-error'}`} />
                    {
                        errors.password && <label className='label label-text-alt text-red-600'>{errors.password.message}</label>
                    }
                    <button className="text-sm mt-1 text-blue-600 hover:text-primary flex items-center gap-2" style={{ alignSelf: 'start' }} type="button" onClick={handleForgotPass}><span>Forgot password?</span> {forgetting && <SpinnerRoundOutlined size={16} thickness={100} speed={180} color="blue" />} </button>
                </div>
                <button className='btn btn-primary' disabled={loggingIn}> {loggingIn ? <ButtonSpinner /> : 'Log In'}</button>
                <p className='text-center -mt-1'>New to Doctors Portal? <NavLink to="/register" state={state} className="text-secondary">Create new Account</NavLink></p>
            </form>
            <Toaster />
            <div className='flex items-center gap-6 my-6 text-xl'>
                <hr className='w-1/2 border border-primary/25' />
                <span>OR</span>
                <hr className='w-1/2 border border-primary/25' />
            </div>
            <GoogleSignIn />
        </div>
    );
};

export default Login;