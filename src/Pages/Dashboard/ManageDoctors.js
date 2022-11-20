import { useQuery } from '@tanstack/react-query';
import React from 'react';
import BodySpinner from '../../components/BodySpinner';

const ManageDoctors = () => {
    const { data: doctors = [], isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => fetch(`http://localhost:1234/doctors`).then(res => res.json()).catch(err => console.error(err))
    })
    return (
        isLoading ? <BodySpinner /> : doctors.length === undefined ? <h2 className='text-center text-gray-600 text-3xl py-24 font-semibold'>Something went wrong</h2> : <div>
            <h2 className='text-center text-3xl pt-16 pb-8 font-semibold'>Doctors List</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map(({ _id, photo, name, email, specialty }, i) => <tr key={_id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={photo} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{specialty}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;