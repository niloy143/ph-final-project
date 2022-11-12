import React from 'react';
import background from '../../../assets/images/appointment.png';
import doctor from '../../../assets/images/doctor.png';
import MyButton from '../../../components/MyButton';

const AppointmentSection = () => {
    return (
        <section className="hero my-16 sm:my-24 lg:my-36 text-base-100 rounded-xl" style={
            {
                backgroundImage: `url(${background})`
            }
        }>
            <div className="hero-content flex-col lg:flex-row lg:gap-24">
                <img src={doctor} className="hidden sm:block h-full md:w-2/3 lg:w-1/2 -mt-48 lg:-mb-4" alt="" />
                <div className='py-6'>
                    <h1 className="text-3xl sm:text-5xl font-bold">Make an appointment Today</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <MyButton className="btn bg-gradient-to-tr from-secondary to-accent border-0 text-base-100">Get Started</MyButton>
                </div>
            </div>
        </section>
    );
};

export default AppointmentSection;