import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import { PhContext } from '../Contexts/Contexts';
import toast from 'react-hot-toast';
import ButtonSpinner from '../components/ButtonSpinner';

const BookingModal = ({ appointment, date, setAppointment, refetch }) => {
    const { user } = useContext(PhContext);
    const [booking, setBooking] = useState(false);
    const { name, slots, price } = appointment;
    const selectedDate = format(date, 'PP');
    const handleSubmit = e => {
        e.preventDefault();
        setBooking(true);
        const form = e.target;
        const schedule = form.schedule.value;
        const patient = form.patientName.value;
        const patientName = (patient.split(' ').map(syl => syl[0].toUpperCase() + syl.slice(1, syl.length))).join(' ');
        const phone = form.phone.value;
        const email = form.email.value;

        const information = {
            appointmentDate: selectedDate,
            treatment: name,
            schedule,
            patientName,
            phone,
            email,
            price,
            paid: false
        }

        fetch(`http://localhost:1234/bookings`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(information)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    toast.success('Booking Successful');
                }
                else {
                    toast.error(data.message);
                }
                setAppointment(null);
            })
            .catch(err => {
                console.error(err);
                toast.error('Something went wrong!');
            })
            .finally(() => setBooking(false))
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">???</label>
                    <h3 className="text-xl text-secondary pt-3 pb-8 font-bold">{name}</h3>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <input type="text" className='input input-primary input-bordered' value={selectedDate} disabled />
                        <input type="text" className='input input-primary input-bordered' value={user?.displayName} name="patientName" required disabled={user} placeholder="Enter your name" />
                        <input type="email" className='input input-primary input-bordered' value={user?.email} name="email" required disabled={user} placeholder="Enter your email address" />
                        <select className="select select-primary" name="schedule">
                            {
                                slots.map(slot => <option value={slot} key={Math.random()}>{slot}</option>)
                            }
                        </select>
                        <input type="number" className='input input-primary input-bordered' placeholder='Phone number' name="phone" />
                        <button className='btn btn-primary' disabled={booking}>{booking ? <ButtonSpinner /> : 'Submit'}</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;