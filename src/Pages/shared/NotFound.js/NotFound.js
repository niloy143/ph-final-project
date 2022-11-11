import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const NotFound = () => {
    return (
        <div>
            <Navbar />
            <div className='text-center my-12 font-semibold text-2xl'>
                Page Not Found
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;