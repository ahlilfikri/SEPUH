import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../shared/loading';
import Modal from '../../shared/modal';
import { jwtDecode } from 'jwt-decode';

const Signin = ({ toggleSigninPopup }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const handleClose = () => {
        setError('');
        setSuccess('');
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${port}user/login`, formData);
            if (response.data.data) {
                const token = response.data.data;
                sessionStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
                setSuccess('Berhasil Masuk');
                setTimeout(() => {
                    if (decodedToken.role === 1) {
                        navigate('/dashboard');
                    } else {
                        navigate('/profile');
                    }
                }, 3000);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleIsLogin = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setError('Anda sudah masuk harap keluar terlebih dahulu');
            setIsLogin(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    useEffect(() => {
        handleIsLogin();
    }, [isLogin]);

    return (
        <Fragment>
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #225374, #28A09E)' }}>
                <div className="card shadow" style={{ borderRadius: '15px', overflow: 'hidden', width: '90%', maxWidth: '900px' }}>
                    <div className="row g-0">
                        <div className="col-md-7 p-5">
                            <div className="d-flex justify-content-center mb-4">
                                <h2 className="mr-3" style={{ color: '#003580', cursor: 'pointer', fontWeight: 'bold' }}>Sign In</h2>
                                <h2 className="ms-4" style={{ color: '#8C8C8C', cursor: 'pointer' }} onClick={handleSignUp}>Sign Up</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row align-items-center mb-3">
                                    <div className="col-2 text-end">
                                        <i className="fa fa-user" style={{ fontSize: '24px', color: '#225374' }}></i>
                                    </div>
                                    <div className="col-10">
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            className="form-control"
                                            value={formData.username}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mb-3">
                                    <div className="col-2 text-end">
                                        <i className="fa fa-lock" style={{ fontSize: '24px', color: '#225374' }}></i>
                                    </div>
                                    <div className="col-10 position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-secondary position-absolute end-0 top-50 translate-middle-y"
                                            style={{ borderRadius: '0 15px 15px 0', background: '#225374', marginRight:'10px' }}
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        style={{ borderRadius: '15px', padding: '10px 20px', background: '#50D68A' }}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center align-items-center" style={{ background: '#225374', padding: '20px' }}>
                            <img
                                src="/dokter.png"
                                alt="Sign In Image"
                                className="img-fluid"
                                style={{ maxWidth: '80%', borderRadius: '15px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleClose} />}
            {success && <Modal data={success} status={'success'} onClose={handleClose} />}
        </Fragment>
    );
};

export default Signin;
