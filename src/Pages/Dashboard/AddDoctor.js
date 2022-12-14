import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import ButtonSpinner from '../../components/ButtonSpinner';
import { PhContext } from '../../Contexts/Contexts';
import useImage from '../../Hooks/useImage';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const { user } = useContext(PhContext);
    const [img, setImg] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    useImage(img, setImgURL);

    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['doctor', 'specialties'],
        queryFn: () => fetch(`http://localhost:1234/doctor/specialties?adminId=${user?.uid}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
            }
        }).then(res => res.json()).catch(err => console.error(err))
    })

    const submissionHandler = ({ name, email, specialty, image }, e) => {

        const formData = new FormData();

        formData.append('image', image[0]);

        setSubmitting(true);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbApiKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(({ data: { url: photo } }) => {
                const doctor = { name, email, specialty, photo };
                fetch(`http://localhost:1234/doctors?adminId=${user?.uid}`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('doctors-portal-token')}`
                    },
                    body: JSON.stringify(doctor)
                })
                    .then(res => res.json())
                    .then(({ acknowledged }) => {
                        if (acknowledged) {
                            toast.success(`${name} is now a doctor in Doctors Portal.`);
                            e.target.reset();
                            setImgURL(null);
                        }
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
            .finally(() => setSubmitting(false))
    }

    return (
        <div>
            <Toaster />
            <h2 className='text-2xl font-semibold text-center pb-3 my-12'>Add a Doctor</h2>
            <form className='flex flex-col gap-4 max-w-xl mx-auto' onSubmit={handleSubmit(submissionHandler)}>
                <div className="form-control">
                    <label className="label font-semibold"> Doctor's Name </label>
                    <input type="text" placeholder="Enter full name" className={`input input-bordered ${errors.name && 'input-error'}`} {
                        ...register('name', {
                            required: 'Please enter doctor\'s name.',
                            minLength: { value: 2, message: 'Name is too short!' },
                            maxLength: { value: 50, message: 'Enter a name, not a novel!' }
                        })
                    } />
                    {
                        errors.name && <label className='label label-text-alt text-red-600'>{errors.name.message}</label>
                    }
                </div>
                <div className="form-control">
                    <label className="label font-semibold"> Doctor's Email Address </label>
                    <input type="email" placeholder="Enter  email address" className={`input input-bordered ${errors.email && 'input-error'}`} {
                        ...register('email', {
                            required: 'Please enter an email address.',
                            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/g, message: 'Please enter a valid email address.' }
                        })
                    } />
                    {
                        errors.email && <label className='label label-text-alt text-red-600'>{errors.email.message}</label>
                    }
                </div>
                <div className="form-control">
                    <label className="label font-semibold"> Select Specialty </label>
                    <select className='select select-bordered' {
                        ...register('specialty', {
                            required: 'Please select a specialty.'
                        })
                    }>
                        {
                            !isLoading && specialties.length && specialties.map(({ _id, name }) => <option key={_id} > {name} </option>)
                        }
                    </select>
                    {
                        errors.specialty && <label className='label label-text-alt text-red-600'>{errors.specialty.message}</label>
                    }
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label font-semibold"> Doctor's Photo </label>
                    <div className="tooltip tooltip-right" data-tip="Square Image Recommended">
                        <input type="file" className="file-input file-input-bordered w-full" {
                            ...register('image', {
                                required: 'Please choose an image file.'
                            })
                        } onChange={e => setImg(e.target.files[0])} />
                    </div>
                    {
                        errors.image && <label className='label label-text-alt text-red-600'>{errors.image.message}</label>
                    }
                </div>
                <img className='max-w-xs rounded-md' src={imgURL} alt="" />
                <button className='btn btn-primary mt-3' disabled={submitting}> {submitting ? <ButtonSpinner /> : 'Add Doctor'} </button>
            </form>
        </div>
    );
};

export default AddDoctor;