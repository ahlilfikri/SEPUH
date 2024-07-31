import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Gambar from '/logo.svg';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Loading from '../loading';
import Modal from '../modal';

const Navbar = ({ isLogin }) => {
    const navigate = useNavigate();
    const [isSignin, setIsSignin] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const port = `${import.meta.env.VITE_BASE_URL}`;

    useEffect(() => {
        handleIsSignin(); 
    }, []);

    const handleSignin = () => {
        navigate('/signin');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    const handleIsSignin = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setIsSignin(decodedToken.role);
        } else {
            setIsSignin(-1); 
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            if (token) {
                const response = await axios.post(`${port}user/logout/${token}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                sessionStorage.removeItem('token');
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/signin');
                }, 3000);
            } else {
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/signin');
                }, 3000);
            }
        } catch (error) {
            if (error.response?.status === 400) {
                sessionStorage.removeItem('token');
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/signin');
                }, 3000);
            } else {
                console.log(error);
                setError('Gagal Logout');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-custom" style={{ background: 'linear-gradient(135deg, #225374, #28A09E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                <div className="container-fluid">
                    <a className="navbar-brand d-flex pe-5 pt-4" href="#">
                        <img src={Gambar} alt="Logo" width="32" height="24" className="d-inline-block align-text-top" />
                        <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>SEPUH</p>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                {!isLogin && (
                                    <div className="nav-link active d-flex align-items-center pe-5 pt-4">
                                        <p style={{ fontWeight: 'bold', margin: 0, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor:'pointer' }} className="pe-4">Home</p>
                                        <div onClick={handleSignin}>
                                            <i className="fas fa-user" style={{ fontSize: '24px', color: '#28A09E', cursor:'pointer' }}></i>
                                            <span style={{ fontSize: '16px', fontWeight: '700', margin: '-10px 0 0 0', cursor:'pointer' }} className='ps-1'>Signin</span>
                                        </div>
                                    </div>
                                )}
                                {isLogin && isSignin === 1 && (
                                    <div className="nav-link active d-flex align-items-center pe-5 pt-4">
                                        <p style={{ fontWeight: 'bold', margin: 0, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor:'pointer' }} onClick={handleDashboard} className="pe-4">Dashboard</p>
                                        <div onClick={handleProfile}>
                                            <i className="fas fa-user" style={{ fontSize: '24px', color: '#28A09E', cursor:'pointer' }}></i>
                                            <span style={{ fontSize: '16px', fontWeight: '700', margin: '-10px 0 0 0', cursor:'pointer' }} className='ps-1'>Profile</span>
                                        </div>
                                    </div>
                                )}
                                {isLogin && isSignin === 0 && (
                                    <div className="nav-link active d-flex align-items-center pe-5 pt-4">
                                        <p style={{ fontWeight: 'bold', margin: 0, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor:'pointer'  }} onClick={handleLogout} className="pe-4">Logout</p>
                                        <div onClick={handleProfile}>
                                            <i className="fas fa-user" style={{ fontSize: '24px', color: '#28A09E', cursor:'pointer' }}></i>
                                            <span style={{ fontSize: '16px', fontWeight: '700', margin: '-10px 0 0 0', cursor:'pointer' }} className='ps-1'>Profile</span>
                                        </div>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={() => setError('')} />}
            {success && <Modal data={success} status={'success'} onClose={() => setSuccess('')} />}
        </Fragment>
    );
};

export default Navbar;
