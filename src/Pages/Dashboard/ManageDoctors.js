import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import BodySpinner from '../../components/BodySpinner';
import { PhContext } from '../../Contexts/Contexts';

const ManageDoctors = () => {
    const { user } = useContext(PhContext);
    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => fetch(`http://localhost:1234/doctors?adminId=${user?.uid}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        }).then(res => res.json()).catch(err => console.error(err))
    })

    const removeDoctor = (id, name) => {
        fetch(`http://localhost:1234/doctor/${id}?adminId=${user?.uid}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        })
            .then(res => res.json())
            .then(({ deletedCount }) => {
                deletedCount && toast.success(`${name} is removed from Doctors Portal.`);
                refetch();
            })
            .catch(err => console.error(err))
    }

    return (
        isLoading ? <BodySpinner /> : doctors.length === undefined ? <h2 className='text-center text-gray-600 text-3xl py-24 font-semibold'>Something went wrong</h2> : <div>
            <Toaster />
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
                            <th></th>
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
                                <td><button className='btn btn-xs btn-error' onClick={() => removeDoctor(_id, name)}>Remove</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;