import React from 'react';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import quote from '../../../assets/icons/quote.svg';

const Testimonial = () => {
    const datas = [
        {
            id: 1,
            text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            patient: people1,
            name: 'Winson Herry',
            location: 'California'
        },
        {
            id: 2,
            text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            patient: people2,
            name: 'Cama Cashie',
            location: 'London'
        },
        {
            id: 3,
            text: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            patient: people3,
            name: 'Herry Paaen',
            location: 'Singapore'
        },
    ]
    return (
        <div className='text-neutral mb-12'>
            <div className='flex justify-between items-center pb-12'>
                <div>
                    <h4 className='text-lg text-accent font-semibold'>Testimonial</h4>
                    <h2 className='text-2xl sm:text-4xl pt-4 pb-8'>What Our Patients Say</h2>
                </div>
                <img className='w-24 sm:w-48' src={quote} alt="" />
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-14'>
                {
                    datas.map(({ id, text, patient, name, location }) => <div key={id} className="p-8 rounded-xl shadow">
                        <p className='py-5'>{text}</p>
                        <div className='flex items-center gap-3'>
                            <div className="avatar">
                                <div className="w-16 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                                    <img src={patient} alt="" />
                                </div>
                            </div>
                            <div>
                                <h4 className='text-lg font-semibold'>Winson Herry</h4>
                                <p>{location}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Testimonial;