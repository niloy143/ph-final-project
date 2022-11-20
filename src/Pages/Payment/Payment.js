import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import BodySpinner from '../../components/BodySpinner';
import { PhContext } from '../../Contexts/Contexts';

const Payment = () => {
    const id = useLoaderData();
    const { user } = useContext(PhContext);
    const { data: booking, isLoading } = useQuery({
        queryKey: ['booking'],
        queryFn: () => fetch(`http://localhost:1234/booking/${id}?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        }).then(res => {
            return (res.status === 401 || res.status === 403) ? {} : res.json();
        })
    })

    console.log(booking)

    return (
        isLoading ? <BodySpinner /> : !booking || !(Object.keys(booking).length) ? <h3 className='text-3xl font-semibold text-center my-12 text-gray-500'> Something went wrong! </h3> : <div>
            <h3 className='text-3xl font-semibold my-5'>Payment for {booking.treatment} </h3>
            <p> Please pay <strong>${booking.price}</strong> for the schedule of <strong>{booking.schedule}</strong> on <strong>{booking.appointmentDate}</strong></p>
        </div>
    );
};

export default Payment;