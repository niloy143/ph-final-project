import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../../assets/images/footer.png';

const Footer = () => {
    return (
        <footer className='text-neutral' style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="footer p-10">
                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Emergency Checkup</Link>
                    <Link className="link link-hover">Monthly Checkup</Link>
                    <Link className="link link-hover">Weekly Checkup</Link>
                    <Link className="link link-hover">Deep Checkup</Link>
                </div>
                <div>
                    <span className="footer-title">Oral Health</span>
                    <Link className="link link-hover">Fluoride Treatment</Link>
                    <Link className="link link-hover">Cavity Filing</Link>
                    <Link className="link link-hover">Teeth Whitening</Link>
                </div>
                <div>
                    <span className="footer-title">Our Address</span>
                    <span>New York - 101010 Hudson</span>
                </div>
            </div>
            <p className='text-center pt-12 pb-8 px-3'>Copyright © 2022 - All right reserved by Doctors Portal</p>
        </footer>
    );
};

export default Footer;