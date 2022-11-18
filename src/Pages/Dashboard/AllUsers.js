import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import BodySpinner from '../../components/BodySpinner';
import { PhContext } from '../../Contexts/Contexts';

const AllUsers = () => {
    const { user } = useContext(PhContext);
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.uid],
        queryFn: () => fetch(`http://localhost:1234/users?adminId=${user?.uid}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        }).then(res => res.json())
    })

    const makeAdmin = (name, id) => {
        fetch(`http://localhost:1234/user?candidate=${id}&admin=${user.uid}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        })
            .then(res => res.json())
            .then(({ modifiedCount }) => {
                if (!!modifiedCount) {
                    toast.success(`${name} is made admin by ${user.displayName}`);
                    refetch();
                }
            })
            .catch(err => console.error(err))
    }

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
                            users.map(({ _id, displayName, email, role, uid }, i) => <tr key={_id}>
                                <th>{i + 1}</th>
                                <td>{displayName}</td>
                                <td>{email}</td>
                                <td>{
                                    role === 'admin' ? <i>Admin</i> : <button className='btn btn-info btn-xs' onClick={() => makeAdmin(displayName, uid)}>Make Admin</button>
                                }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;