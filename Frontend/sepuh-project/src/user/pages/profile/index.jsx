import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import axios from 'axios';
import Loading from '../../../shared/loading';
import Modal from '../../../shared/modal';
import Gambar from '/profile.png';
import Navbar from '../../../shared/navbar';

const Profile = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleIsLogin = () => {
        const token = sessionStorage.getItem('token');
        setIsLogin(!!token);
        return token;
    };

    const fetchData = async (token) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const response = await axios.get(`${port}user/${decodedToken.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (!response.data.data) {
                setError('Gagal mengambil data profil, silahkan muat ulang halaman');
            } else {
                setData(response.data.data);
            }
        } catch (error) {
            setError('Gagal mengambil data profil, silahkan muat ulang halaman');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const token = handleIsLogin();
        if (token) {
            fetchData(token);
        } else {
            navigate('/signin');
        }
    }, []);
    
    const handleResetPassword = () => {
        navigate('/reset');
    };
    
    const handleClose = () => {
        setError('');
        setSuccess('');
    };
    
    return (
        <Fragment>
            <header>
                <Navbar isLogin={isLogin} />
            </header>
            <div
                className="container-fluid d-flex justify-content-center align-items-center vh-100"
                style={{ background: 'linear-gradient(135deg, #225374, #28A09E)' }}
                >
                <div className="text-center text-white p-4">
                    <img src={Gambar} alt="Profile" className="img-fluid mb-3" style={{ width: '250px' }} />
                    {data ? (
                        <>
                            <h3>{data.name || 'User Name'}</h3>
                            <div className="profile-info mt-4">
                                <div className="profile-item p-3 mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
                                    <p><strong>Nama:</strong> {data.nama}</p>
                                </div>
                                <div className="profile-item p-3 mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
                                    <p><strong>Username:</strong> {data.username}</p>
                                </div>
                                <div className="profile-item p-3 mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
                                    <p><strong>Email:</strong> {data.email}</p>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button onClick={handleResetPassword} className="btn btn-primary">Reset Password</button>
                            </div>
                        </>
                    ) : (
                        <p>Memuat data...</p>
                    )}
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleClose} />}
            {success && <Modal data={success} status={'success'} onClose={handleClose} />}
        </Fragment>
    );
};

export default Profile;
