import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import BodySpinner from '../../components/BodySpinner';
import { PhContext } from '../../Contexts/Contexts';

const AllUsers = () => {
    const { user } = useContext(PhContext);
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', user?.uid],
        queryFn: () => fetch(`http://localhost:1234/users?adminId=${user?.uid}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        }).then(res => res.json())
    })

    return (
        isLoading ? <BodySpinner /> : users.length === undefined ? <h3 className='text-2xl my-24 text-center font-semibold text-gray-500'>Something went wrong!</h3> : <div>
            <h2 className='text-2xl text-center my-8 font-semibold'>Users List</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(({ _id, displayName, email }, i) => <tr key={_id}>
                                <th>{i + 1}</th>
                                <td>{displayName}</td>
                                <td>{email}</td>
                                <td><button className='btn btn-info btn-xs'>Make Admin</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;