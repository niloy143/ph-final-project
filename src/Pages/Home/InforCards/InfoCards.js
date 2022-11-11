import React from 'react';
import infoIcon1 from '../../../assets/icons/clock.svg';
import infoIcon2 from '../../../assets/icons/marker.svg';
import infoIcon3 from '../../../assets/icons/phone.svg';

const InfoCards = () => {
    const cards = [
        {
            id: 1,
            bg: 'bg-gradient-to-r from-accent to-secondary',
            icon: infoIcon1,
            title: 'Opening Hours',
            info: 'Every time when you got a problem with your teeth.'
        },
        {
            id: 2,
            bg: 'bg-neutral',
            icon: infoIcon2,
            title: 'Visit our location',
            info: 'Brooklyn, NY 10036, United States'
        },
        {
            id: 3,
            bg: 'bg-gradient-to-r from-accent to-secondary',
            icon: infoIcon3,
            title: 'Contact us now',
            info: '+000 123 456789'
        }
    ]
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12'>
            {
                cards.map(({ id, bg, icon, title, info }) => <div className={`${bg} text-base-100 py-12 px-6 rounded-xl flex flex-col sm:flex-row items-center gap-5`} key={id}>
                    <img src={icon} alt="" />
                    <div>
                        <h3 className='text-xl font-semibold mb-3'>{title}</h3>
                        <p>{info}</p>
                    </div>
                </div>)
            }
        </div>
    );
};

export default InfoCards;