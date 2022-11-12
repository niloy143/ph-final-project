import React from 'react';

const MyButton = ({children}) => {
    return (
        <button className="btn btn-primary bg-gradient-to-br from-accent to-secondary text-base-100 border-0">{children}</button>
    );
};

export default MyButton;