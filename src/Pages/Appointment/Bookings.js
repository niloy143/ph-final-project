import React, { useState } from 'react';
import { format } from 'date-fns';
import BookingModal from '../../components/BookingModal';
import { useQuery } from '@tanstack/react-query';
import BodySpinner from '../../components/BodySpinner';
import { Toaster } from 'react-hot-toast';

const Bookings = ({ date }) => {
    const [appointment, setAppointment] = useState(null);
    const datePP = date && format(date, 'PP');

    const { data, isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['appointmentOptions', datePP],
        queryFn: () => fetch(`http://localhost:1234/appointmentOptions?date=${datePP}`).then(res => res.json())
    })

    return (
        <div className='pb-24 text-primary px-3'>
            <h2 className='text-secondary text-xl font-semibold text-center py-16'>{date ? `Available Appointments on ${datePP}` : 'Please select a day'}</h2>
            {
                isLoading ? <BodySpinner /> : !isSuccess ? <h3 className='text-3xl font-semibold text-gray-400 text-center my-24'>Something went wrong!</h3> :
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            date && data.map(({ name, slots, _id }) => <div key={_id} className="shadow-md p-8 rounded-xl flex flex-col items-center gap-2">
                                <h4 className='text-secondary text-xl font-semibold'>{name}</h4>
                                <p className='font-semibold'>{slots[0]}</p>
                                <p className='uppercase'>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                                <label disabled={!(slots.length)} htmlFor="booking-modal" className='btn bg-gradient-to-r from-secondary to-accent border-0 text-base-100' onClick={() => setAppointment({ name, slots, _id })}>BOOK APPOINTMENT</label>
                            </div>)
                        }
                    </div>
            }

            <Toaster />
            <div>
                {
                    appointment && <BookingModal appointment={appointment} date={date} setAppointment={setAppointment} refetch={refetch} />
                }
            </div>
        </div>
    );
};

export default Bookings;