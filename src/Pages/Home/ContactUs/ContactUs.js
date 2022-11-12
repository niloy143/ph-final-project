import React from 'react';
import background from '../../../assets/images/appointment.png';
import MyButton from '../../../components/MyButton';

const ContactUs = () => {
    return (
        <div className='px-8 py-16' style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className='text-center text-base-100'>
                <h4 className='text-lg sm:text-xl font-semibold text-accent'>Contact Us</h4>
                <h2 className='text-2xl sm:text-4xl pb-12'>Stay Connected With Us</h2>
            </div>
            <form className='flex flex-col items-center gap-3 max-w-lg mx-auto'>
                <input type="text" placeholder='Email Address' className='input w-full' />
                <input type="text" placeholder='Subject' className='input w-full' />
                <textarea className='textarea w-full' placeholder="Your message..." rows={5} />
                <MyButton type="submit"><span className='px-5'>Submit</span></MyButton>
            </form>
        </div>
    );
};

export default ContactUs;