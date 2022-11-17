import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { PhContext } from "../../Contexts/Contexts";
import BodySpinner from '../../components/BodySpinner';

const Dashboard = () => {
    const { user } = useContext(PhContext);
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: () => fetch(`http://localhost:1234/bookings?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        }).then(res => res.json())
    })

    return (
        isLoading ? <BodySpinner /> : bookings.length === undefined ? <h3 className='text-2xl my-24 text-center font-semibold text-gray-500'>Something went wrong!</h3> : bookings.length === 0 ? <h3 className='text-xl text-center my-16 font-semibold text-gray-700'>You didn't book any appointment yet!</h3> : <div>
            <h2 className='text-2xl text-center my-8 font-semibold'>Your Appointments</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Patient</th>
                            <th>Treatment</th>
                            <th>Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(({ _id, patientName, treatment, schedule }, i) => <tr key={_id}>
                                <th>{i + 1}</th>
                                <td>{patientName}</td>
                                <td>{treatment}</td>
                                <td>{schedule}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;