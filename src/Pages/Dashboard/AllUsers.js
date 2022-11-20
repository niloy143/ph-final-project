import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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

    const roleChange = (name, id, role) => {
        fetch(`http://localhost:1234/user?candidate=${id}&role=${role}&adminId=${user.uid}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        })
            .then(res => res.json())
            .then(({ modifiedCount }) => {
                if (!!modifiedCount) {
                    toast.success(`${name} is ${role === 'admin' ? 'demoted to user' : 'promoted to admin'} by ${user.displayName}`);
                    refetch();
                }
            })
            .catch(err => console.error(err))
    }

    return (
        isLoading ? <BodySpinner /> : users.length === undefined ? <h3 className='text-2xl my-24 text-center font-semibold text-gray-500'>Something went wrong!</h3> : <div>
            <h2 className='text-2xl text-center my-8 font-semibold'>Users List</h2>
            <Toaster />
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(({ _id, displayName, email, role, uid }, i) => <tr key={_id}>
                                <th>{i + 1}</th>
                                <td>{displayName}</td>
                                <td>{email}</td>
                                <td>{role}</td>
                                <td>{
                                    uid === user?.uid ? 'You' : <button className={`btn ${role !== 'admin' ? 'btn-info' : 'btn-warning'} btn-xs`} onClick={() => roleChange(displayName, uid, role)}>{role !== 'admin' ? 'Promote to Admin' : 'Demote to User'}</button>
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