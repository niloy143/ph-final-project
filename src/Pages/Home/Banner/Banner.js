import React from 'react';
import bannerImg from '../../../assets/images/chair.png';
import background from '../../../assets/images/chair.png';
import MyButton from '../../../components/MyButton';

const Banner = () => {
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className="hero" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}>
                <div className={`hero-content flex-col lg:flex-row-reverse justify-between py-12 sm:py-48`}>
                    <img src={bannerImg} className="lg:w-1/2 rounded-lg shadow-2xl" alt="" />
                    <div className='text-neutral lg:w-1/2'>
                        <h1 className="text-3xl sm:text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <MyButton className="btn btn-primary bg-gradient-to-br from-accent to-secondary text-base-100 border-0">Get Started</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;