import React from 'react';
import { SpinnerCircularFixed } from 'spinners-react';

const ButtonSpinner = ({ size }) => {
    return (
        <SpinnerCircularFixed size={size || 32} thickness={150} speed={180} secondaryColor="rgba(0, 0, 0, 0.2)" />
    );
};

export default ButtonSpinner;