import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { PhContext } from "../../Contexts/Contexts";
import BodySpinner from '../../components/BodySpinner';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useLocation } from 'react-router-dom';
import Confirmation from '../../components/Confirmation';

const MyAppointments = () => {
    const { pathname } = useLocation();
    const { user } = useContext(PhContext);
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: () => fetch(`http://localhost:1234/bookings?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        }).then(res => res.json())
    })
    const [modalData, setModalData] = useState(null);

    const cancelAppointment = id => {
        fetch(`http://localhost:1234/bookings/${id}?email=${user?.email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        })
            .then(res => res.json())
            .then(({ deletedCount }) => {
                if (deletedCount) {
                    refetch();
                    toast.success('Deletion successful')
                }
            })
    }

    return (
        isLoading ? <BodySpinner /> : bookings.length === undefined ? <h3 className='text-2xl my-24 text-center font-semibold text-gray-500'>Something went wrong!</h3> : bookings.length === 0 ? <h3 className='text-xl text-center my-16 font-semibold text-gray-700'>You didn't book any appointment yet!</h3> : <div>
            <h2 className='text-2xl text-center my-8 font-semibold'>Your Appointments</h2>
            <Toaster />
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Patient</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Schedule</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(({ _id, patientName, treatment, appointmentDate, schedule, paid, price }, i) => <tr key={_id}>
                                <th>{i + 1}</th>
                                <td>{patientName}</td>
                                <td>{treatment}</td>
                                <td>{appointmentDate}</td>
                                <td>{schedule}</td>
                                <td>{paid ? <i>paid</i> : <NavLink className='btn btn-xs btn-accent' to={`/dashboard/payment/${_id}`} state={pathname}>pay ${price}</NavLink>}</td>
                                <td><label htmlFor='confirmation' className='btn btn-xs btn-error' onClick={() => setModalData(_id)}>Cancel Appointment</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                modalData && <Confirmation
                    modalData={modalData}
                    closeModal={setModalData}
                    button={{ bg: 'btn-error' }}
                    passData={cancelAppointment}
                    message={'Are you sure you want to cancel this appointment?'}
                />
            }
        </div>
    );
};

export default MyAppointments;