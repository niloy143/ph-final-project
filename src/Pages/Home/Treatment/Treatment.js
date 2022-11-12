import React from 'react';
import treatment from '../../../assets/images/treatment.png';
import MyButton from '../../../components/MyButton';

const Treatment = () => {
    return (
        <div className="hero my-12">
            <div className="hero-content flex-col lg:flex-row gap-12 sm:gap-24 text-neutral">
                <img src={treatment} className="w-full max-w-sm rounded-lg shadow-2xl" alt="" />
                <div>
                    <h1 className="text-3xl sm:text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <MyButton className="btn bg-gradient-to-tr from-secondary to-accent border-0 text-base-100">Get Started</MyButton>
                </div>
            </div>
        </div>
    );
};

export default Treatment;