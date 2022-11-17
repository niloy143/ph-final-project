import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboardMenu" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-4"> <Outlet /> </div>
                <div className="drawer-side">
                    <label htmlFor="dashboardMenu" className="drawer-overlay"></label>
                    <ul className="menu gap-1 p-4 w-80 bg-base-100 text-base-content">
                        <li><NavLink to="/dashboard/my-appointments">My Appointments</NavLink></li>
                        <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;