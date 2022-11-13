import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { state } = useLocation();
    return (
        <div className='shadow rounded-xl px-6 py-12 max-w-lg mx-auto my-12 sm:my-24'>
            <h2 className='text-2xl font-semibold text-center pb-3'>Login</h2>
            <form className='flex flex-col gap-4'>
                <div className="form-control">
                    <label className="label font-semibold"> Email </label>
                    <input type="text" placeholder="Your email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label font-semibold"> Password </label>
                    <input type="password" placeholder="Your password" className="input input-bordered" />
                    <NavLink to="" className="text-sm mt-1">Forgot password?</NavLink>
                </div>
                <button className='btn btn-primary'>Login</button>
                <p className='text-center -mt-1'>New to Doctors Portal? <NavLink to="/register" state={state} className="text-secondary">Create new Account</NavLink></p>
            </form>
            <div className='flex items-center gap-6 my-6 text-xl'>
                <hr className='w-1/2 border border-primary/25' />
                <span>OR</span>
                <hr className='w-1/2 border border-primary/25' />
            </div>
            <button className='flex items-center gap-2 sm:text-lg font-semibold border rounded-lg shadow w-full p-3 sm:px-6 uppercase active:scale-95 transition justify-center'>
                <FcGoogle className='text-2xl' />
                <span>Continue With Google</span>
            </button>
        </div>
    );
};

export default Login;