import React from 'react';

const MyButton = ({children}) => {
    return (
        <button className="btn btn-primary bg-gradient-to-br from-secondary to-primary text-base-100 border-0">{children}</button>
    );
};

export default MyButton;