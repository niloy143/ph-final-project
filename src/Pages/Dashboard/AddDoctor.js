import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSpinner from '../../components/ButtonSpinner';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);

    const submissionHandler = ({ name, email, image }) => {

        const formData = new FormData();

        formData.append('image', image[0]);

        setSubmitting(true);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbApiKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(({ data: { url: photo } }) => {
                const doctor = { name, email, photo };
                console.log(doctor);
                setSubmitting(false);
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
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
                <div className="form-control w-full max-w-xs">
                    <label className="label font-semibold"> Doctor's Photo </label>
                    <input type="file" className="file-input file-input-bordered w-full" {
                        ...register('image', {
                            required: 'Please choose an image file.'
                        })
                    } />
                    {
                        errors.image && <label className='label label-text-alt text-red-600'>{errors.image.message}</label>
                    }
                </div>
                <button className='btn btn-primary mt-3' disabled={submitting}> {submitting ? <ButtonSpinner /> : 'Add Doctor'} </button>
            </form>
        </div>
    );
};

export default AddDoctor;