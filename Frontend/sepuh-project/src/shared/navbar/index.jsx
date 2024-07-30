import React from 'react';
import { useNavigate } from 'react-router-dom';
import Gambar from '/logo.svg';

const Navbar = ({ isLogin }) => {
    const navigate = useNavigate();

    const handleSignin = () => {
        navigate('/signin');
    };

    const handleProfile = () => {
        navigate('/profile');
    }

    const handleDashboard = () => {
        navigate('/dashboard');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-custom" style={{ background: 'linear-gradient(135deg, #225374, #28A09E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            <div className="container-fluid">
                <a className="navbar-brand d-flex pe-5 pt-4" href="#">
                    <img src={Gambar} alt="" width="32" height="24" className="d-inline-block align-text-top" />
                    <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>SEPUH</p>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {!isLogin &&
                                <a className="nav-link active d-flex align-items-center pe-5 pt-4" aria-current="page" href="#">
                                    <p style={{ fontWeight: 'bold', margin: 0, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="pe-4">Home</p>
                                    <div onClick={handleSignin}>
                                        <i className="fas fa-user" style={{ fontSize: '24px', color: '#28A09E' }}></i>
                                        <span style={{ fontSize: '16px', fontWeight: '700', margin: '-10px 0 0 0' }} className='ps-1'>Signin</span>
                                    </div>
                                </a>
                            }
                            {isLogin &&
                                <a className="nav-link active d-flex align-items-center pe-5 pt-4" aria-current="page" href="#">
                                    <p style={{ fontWeight: 'bold', margin: 0, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} onClick={handleDashboard} className="pe-4">Dashboard</p>
                                    <div onClick={handleProfile}>
                                        <i className="fas fa-user" style={{ fontSize: '24px', color: '#28A09E' }}></i>
                                        <span style={{ fontSize: '16px', fontWeight: '700', margin: '-10px 0 0 0' }} className='ps-1'>Profile</span>
                                    </div>
                                </a>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
