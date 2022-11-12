import React from 'react';
import { format } from 'date-fns';

const BookingModal = ({ appointment, date, setAppointment }) => {
    const { name, slots } = appointment;
    const selectedDate = format(date, 'PP');
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const schedule = form.schedule.value;
        const patient = form.patientName.value;
        const patientName = (patient.split(' ').map(syl => syl[0].toUpperCase() + syl.slice(1, syl.length))).join(' ');
        const phone = form.phone.value;
        const email = form.email.value;

        const information = {
            appointment: selectedDate,
            treatment: name,
            schedule,
            patientName,
            phone,
            email
        }

        console.log(information);
        setTimeout(() => {
            setAppointment(null);
        }, 2000);
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl text-secondary pt-3 pb-8 font-bold">{name}</h3>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <input type="text" className='input input-accent input-bordered' value={selectedDate} readOnly />
                        <select className="select select-accent" name="schedule">
                            {
                                slots.map(slot => <option value={slot} key={Math.random()}>{slot}</option>)
                            }
                        </select>
                        <input type="text" className='input input-accent input-bordered' placeholder='Your full name' name="patientName" />
                        <input type="number" className='input input-accent input-bordered' placeholder='Phone number' name="phone" />
                        <input type="email" className='input input-accent input-bordered' placeholder='Email address' name="email" />
                        <button className='btn btn-accent'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;