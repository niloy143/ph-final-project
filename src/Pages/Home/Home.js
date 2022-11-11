import React from 'react';
import AppointmentSection from './AppointmentSection/AppointmentSection';
import Banner from './Banner/Banner';
import InfoCards from './InforCards/InfoCards';
import OurServices from './OurServices/OurServices';
import Treatment from './Treatment/Treatment';

const Home = () => {
    return (
        <div className='px-5'>
            <Banner />
            <InfoCards />
            <OurServices />
            <Treatment />
            <AppointmentSection />
        </div>
    );
};

export default Home;