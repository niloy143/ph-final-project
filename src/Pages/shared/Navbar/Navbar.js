import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ButtonSpinner from '../../../components/ButtonSpinner';
import { PhContext } from '../../../Contexts/Contexts';
import { MdOutlineMenuOpen } from 'react-icons/md';

const Navbar = () => {
    const { user, userLoading, logOut } = useContext(PhContext);

    const menuItems = <>
        {user && <li><NavLink className={`rounded ml-1`} to="/dashboard">Dashboard</NavLink></li>}
        <li><NavLink className={`rounded ml-1`} to="/appointment">Appointment</NavLink></li>
        <li><NavLink className={`rounded ml-1`} to="/reviews">Reviews</NavLink></li>
        <li><NavLink className={`rounded ml-1`} to="/about">About</NavLink></li>
        <li> {user ? <button className='btn btn-primary rounded text-white ml-1' onClick={logOut}>Sign Out</button> : <NavLink className={`rounded ml-1`} to="/login">Login</NavLink>} </li>
    </>
    return (
        <div className="navbar justify-between bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <NavLink className="btn btn-ghost normal-case text-xl" to="/">Doctors Portal</NavLink>
            </div>
            <div className="navbar-end hidden lg:flex">
                {
                    userLoading ? <ButtonSpinner /> :
                        <ul className="menu menu-horizontal p-0">
                            {menuItems}
                        </ul>
                }
            </div>
            <label tabIndex={0} htmlFor="dashboardMenu" className="btn btn-ghost lg:hidden">
                <MdOutlineMenuOpen className='text-2xl' />
            </label>
        </div>
    );
};

export default Navbar;