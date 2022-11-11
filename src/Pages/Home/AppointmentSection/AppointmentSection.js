import React from 'react';
import background from '../../../assets/images/appointment.png';
import doctor from '../../../assets/images/doctor.png';

const AppointmentSection = () => {
    return (
        <section className="hero my-12 text-base-100 rounded-xl" style={
            {
                backgroundImage: `url(${background})`
            }
        }>
            <div className="hero-content flex-col lg:flex-row gap-12 sm:gap-24">
                <img src={doctor} className="-mt-32 w-96 rounded-lg shadow-2xl" alt="" />
                <div className='py-6'>
                    <h1 className="text-3xl sm:text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <button className="btn bg-gradient-to-tr from-secondary to-accent border-0 text-base-100">Get Started</button>
                </div>
            </div>
        </section>
    );
};

export default AppointmentSection;