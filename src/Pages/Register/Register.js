import React, { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ButtonSpinner from '../../components/ButtonSpinner';
import { PhContext } from '../../Contexts/Contexts';
import BodySpinner from '../../components/BodySpinner';
import GoogleSignIn from '../../components/GoogleSignIn';
import useToken from '../../Hooks/useToken';

const Register = () => {
    const { user, userLoading, createUser, setName } = useContext(PhContext);
    const { state } = useLocation();
    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();
    const [registering, setRegistering] = useState(false);
    const [registeredUser, setRegisteredUser] = useState(null);
    useToken(registeredUser, setRegistering);

    const submissionHandler = ({ name, email, password }, e) => {
        setRegistering(true);
        createUser(email, password)
            .then(result => {
                setName(name)
                    .then(() => { })
                    .catch(err => console.error(err.code))
                    .finally(() => {
                        e.target.reset();
                        const { displayName, email, uid } = result.user;
                        setRegisteredUser({ displayName, email, uid });
                    })
            })
            .catch(err => {
                if (err.code === 'auth/email-already-exists' || err.code === 'auth/email-already-in-use') {
                    setError('email', {
                        type: 'authentication',
                        message: 'Someone has already signed in with this email address'
                    })
                }
                console.error(err.code)
                setRegistering(false)
            })
    };

    return (
        userLoading ? <BodySpinner /> : user && !registering ? <Navigate to={state || '/'} /> : <div className='shadow rounded-xl px-6 py-12 max-w-lg mx-auto my-12 sm:my-24'>
            <h2 className='text-2xl font-semibold text-center pb-3'>Create New Account</h2>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(submissionHandler)}>
                <div className="form-control">
                    <label className="label font-semibold"> Your Name </label>
                    <input type="text" placeholder="Enter your name" className={`input input-bordered ${errors.name && 'input-error'}`} {
                        ...register('name', {
                            required: 'Please enter your name.',
                            minLength: { value: 2, message: 'Name is too short!' },
                            maxLength: { value: 50, message: 'Enter a name, not a novel!' }
                        })
                    } />
                    {
                        errors.name && <label className='label label-text-alt text-red-600'>{errors.name?.message}</label>
                    }
                </div>
                <div className="form-control">
                    <label className="label font-semibold"> Email </label>
                    <input type="email" placeholder="Your Email" className={`input input-bordered ${errors.email && 'input-error'}`} {
                        ...register('email', {
                            required: 'Please enter an email address.',
                            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/g, message: 'Please enter a valid email address.' }
                        })
                    } />
                    {
                        errors.email && <label className='label label-text-alt text-red-600'>{errors.email?.message}</label>
                    }
                </div>
                <div className="form-control">
                    <label className="label font-semibold"> Password </label>
                    <input type="password" placeholder="Your Password" className={`input input-bordered ${errors.password && 'input-error'}`} {
                        ...register('password', {
                            required: 'Please choose a password',
                            minLength: { value: 6, message: 'Password is too short!' },
                            maxLength: { value: 20, message: 'Password is too long!' },
                            pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/g, message: 'Password should contain at least a capital letter, a small letter and a number' }
                        })
                    } />
                    {
                        errors.password && <label className='label label-text-alt text-red-600'>{errors.password?.message}</label>
                    }
                </div>
                <div className="form-control">
                    <label className="label font-semibold"> Confirm Password </label>
                    <input type="password" placeholder="Confirm password" className={`input input-bordered ${errors.confirm && 'input-error'}`} {
                        ...register('confirm', {
                            validate: v => v === watch().password || "Confirm password should be same as password"
                        })
                    } />
                    {
                        errors.confirm && <label className='label label-text-alt text-red-600'>{errors.confirm?.message}</label>
                    }
                </div>
                <button className='btn btn-primary mt-3' disabled={registering}> {registering ? <ButtonSpinner /> : 'Create Account'} </button>
                <p className='text-center -mt-1'>Already have an account? <NavLink to="/login" state={state} className="text-secondary">Sign In</NavLink></p>
            </form>
            <div className='flex items-center gap-6 my-6 text-xl'>
                <hr className='w-1/2 border border-primary/25' />
                <span>OR</span>
                <hr className='w-1/2 border border-primary/25' />
            </div>
            <GoogleSignIn loading={registering} setLoading={setRegistering} />
        </div>
    );
};

export default Register;