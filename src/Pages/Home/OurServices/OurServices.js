import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';

const OurServices = () => {
    const services = [
        {
            id: 1,
            img: fluoride,
            title: 'Fluoride Treatment',
            des: 'A treatment that you provider constantly, day and night. And also out of day and nights.'
        },
        {
            id: 2,
            img: cavity,
            title: 'Cavity Filling',
            des: 'The teeth that carries cavity is not a good teeth but as you wish we will fill it.'
        },
        {
            id: 3,
            img: whitening,
            title: 'Teeth Whitening',
            des: 'As your teeth are ugly, you should whiten your teeth from us so that everyone stops to hate you.'
        }
    ]
    return (
        <div className='text-neutral my-24'>
            <div className='text-center'>
                <h4 className='text-xl font-semibold text-secondary'>OUR SERVICES</h4>
                <h2 className='text-3xl font-semibold pt-3 pb-12'>Services We Provide</h2>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    services.map(({ id, img, title, des }) => <div key={id} className="text-center p-5 rounded-2xl shadow-lg border">
                        <img className='py-3 mx-auto' src={img} alt="" />
                        <h3 className='py-3 text-xl font-semibold'>{title}</h3>
                        <p>{des}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default OurServices;