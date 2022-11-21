import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { PhContext } from "../../Contexts/Contexts";
import useAdmin from "../../Hooks/useAdmin";

const DashboardLayout = () => {
    const { user } = useContext(PhContext);
    const [isAdmin] = useAdmin(user.uid);

    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboardMenu" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-4"> <Outlet /> </div>
                <div className="drawer-side">
                    <label htmlFor="dashboardMenu" className="drawer-overlay"></label>
                    <ul className="menu gap-1 p-4 w-80 text-base-content">
                        <li><NavLink to="/dashboard/my-appointments">My Appointments</NavLink></li>
                        {
                            isAdmin && <>
                                <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
                                <li><NavLink to="/dashboard/add-doctor">Add Doctor</NavLink></li>
                                <li><NavLink to="/dashboard/manage-doctors">Manage Doctors</NavLink></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;