import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Gambar from '/logo.svg';
import { jwtDecode } from 'jwt-decode';
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
                setError('Gagal Logout');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-custom" >
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src={Gambar} alt="Logo" width="32" height="24" className="d-inline-block align-text-top" />
                        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>SEPUH</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <p className="nav-link mt-3 mx-0 mx-md-1" style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>Home</p>
                            </li>
                            {!isLogin && (
                                <li className="nav-item">
                                    <div onClick={handleSignin} className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                        <i className="fas fa-user" style={{ fontSize: '24px', color: '#28A09E' }}></i>
                                        <span style={{ fontSize: '16px', fontWeight: '700', marginLeft: '5px' }}>Signin</span>
                                    </div>
                                </li>
                            )}
                            {isLogin && (isSignin != 0 && isSignin != 2) && (
                                <>
                                    <li className="nav-item mx-0 mx-md-1 mt-md-3 ">
                                        <p className="nav-link" style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleDashboard}>Dashboard</p>
                                    </li>
                                    <li className="nav-item py-3">
                                        <div onClick={handleProfile} className="d-flex align-items-center " style={{ cursor: 'pointer' }}>
                                            <i className="fas fa-user" style={{ fontSize: '24px', color: '#28A09E' }}></i>
                                            <span style={{ fontSize: '16px', fontWeight: '700', marginLeft: '5px' }}>Profile</span>
                                        </div>
                                    </li>
                                </>
                            )}
                            {isLogin && (isSignin != 1 && isSignin != 3) && (
                                <>
                                    <li className="nav-item">
                                        <p className="nav-link" style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogout}>Logout</p>
                                    </li>
                                    <li className="nav-item">
                                        <div onClick={handleProfile} className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                            <i className="fas fa-user" style={{ fontSize: '24px', color: '#28A09E' }}></i>
                                            <span style={{ fontSize: '16px', fontWeight: '700', marginLeft: '5px' }}>Profile</span>
                                        </div>
                                    </li>
                                </>
                            )}
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
