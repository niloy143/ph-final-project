import React from 'react';
import { SpinnerDiamond } from 'spinners-react';

const BodySpinner = () => {
    return (
        <div className='flex justify-center items-center' style={{height: '80vh'}}>
            <SpinnerDiamond size={60} thickness={180} speed={180} color="green" secondaryColor="rgba(0, 0, 0, 0.2)" />
        </div>
    );
};

export default BodySpinner;