import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import BookingModal from '../../components/BookingModal';

const Bookings = ({ date }) => {
    const [appoints, setAppoints] = useState([]);
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        fetch('appoints.json')
            .then(res => res.json())
            .then(data => setAppoints(data))
    }, [])

    return (
        <div className='pb-24 text-accent px-3'>
            <h2 className='text-secondary text-xl font-semibold text-center py-16'>{date ? `Available Appointments on ${format(date, 'PP')}` : 'Please select a day'}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    date && appoints.map(({ name, slots, _id }) => <div key={_id} className="shadow-md p-8 rounded-xl flex flex-col items-center gap-2">
                        <h4 className='text-secondary text-xl font-semibold'>{name}</h4>
                        <p className='font-semibold'>{'10:00AM - 11:00PM'}</p>
                        <p className='uppercase'>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                        <label disabled={!(slots.length)} htmlFor="booking-modal" className='btn bg-gradient-to-r from-secondary to-primary border-0 text-base-100' onClick={() => setAppointment({ name, slots, _id })}>BOOK APPOINTMENT</label>
                    </div>)
                }
            </div>
            <div>
                {
                    appointment && <BookingModal appointment={appointment} date={date} setAppointment={setAppointment} />
                }
            </div>
        </div>
    );
};

export default Bookings;