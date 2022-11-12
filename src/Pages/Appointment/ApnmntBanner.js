import React from 'react';
import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';

const ApnmntBanner = ({date, setDate}) => {
    
    return (
        <div className="hero my-12 md:my-24">
            <div className="hero-content flex-col lg:flex-row-reverse justify-between">
                <img src={chair} className="w-full sm:w-2/3 md:w-1/2 rounded-lg shadow-2xl" alt="" />
                <div>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default ApnmntBanner;