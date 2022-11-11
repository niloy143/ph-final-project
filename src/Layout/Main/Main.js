import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Pages/shared/Footer/Footer';
import Navbar from '../../Pages/shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;