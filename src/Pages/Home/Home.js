import React from 'react';
import AppointmentSection from './AppointmentSection/AppointmentSection';
import Banner from './Banner/Banner';
import ContactUs from './ContactUs/ContactUs';
import InfoCards from './InforCards/InfoCards';
import OurServices from './OurServices/OurServices';
import Testimonial from './Testimonial/Testimonial';
import Treatment from './Treatment/Treatment';

const Home = () => {
    return (
        <div className='px-5'>
            <Banner />
            <InfoCards />
            <OurServices />
            <Treatment />
            <AppointmentSection />
            <Testimonial />
            <ContactUs />
        </div>
    );
};

export default Home;