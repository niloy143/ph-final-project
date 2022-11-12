import React, { useState } from 'react';
import ApnmntBanner from './ApnmntBanner';
import Bookings from './Bookings';

const ApnmntPage = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <ApnmntBanner date={date} setDate={setDate} />
            <Bookings date={date} setDate={setDate} />
        </div>
    );
};

export default ApnmntPage;