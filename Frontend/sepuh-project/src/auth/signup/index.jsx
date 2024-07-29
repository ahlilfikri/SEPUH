import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../shared/loading';
import Modal from '../../shared/modal';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords dan confirm password tidak sesuai');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${port}user/register`, formData);
            console.log(formData);
            if (response.data.data) {
                setSuccess('Berhasil Membuat Akun');
                setTimeout(() => {
                    navigate('/signin');
                }, 3000);
            } else {
                console.log(response);
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Fragment>
            <div
                className="container-fluid d-flex justify-content-center align-items-center vh-100"
                style={{ background: 'linear-gradient(135deg, #225374, #28A09E)' }}
            >
                <div
                    className="card shadow"
                    style={{ borderRadius: '15px', overflow: 'hidden', width: '900px' }}
                >
                    <div className="row no-gutters">
                        <div className="col-md-8 p-5">
                            <div className="d-flex justify-content-center mb-4">
                                <h2 className="mr-3" onClick={handleSignIn} style={{ color: '#8C8C8C', cursor: 'pointer' }}>Sign In</h2>
                                <h2 className='ms-4' style={{color: '#225374', cursor: 'pointer', fontWeight: 'bold' }}>Sign Up</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row align-items-center mb-3">
                                    <label style={{ fontSize: '18px', fontWeight: 'bold', color : '#225374' }} htmlFor="username" className="col-sm-4 col-form-label">User Name</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            value={formData.username}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mb-3">
                                    <label style={{ fontSize: '18px', fontWeight: 'bold', color : '#225374' }} htmlFor="email" className="col-sm-4 col-form-label">Email</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mb-3">
                                    <label style={{ fontSize: '18px', fontWeight: 'bold', color : '#225374' }} htmlFor="password" className="col-sm-4 col-form-label">Password</label>
                                    <div className="col-sm-8 position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-secondary position-absolute end-0 top-50 translate-middle-y me-2"
                                            style={{ borderRadius: '0 15px 15px 0', background:'#225374' }}
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mb-3">
                                    <label style={{ fontSize: '18px', fontWeight: 'bold', color : '#225374' }} htmlFor="confirmPassword" className="col-sm-4 col-form-label">Confirm Password</label>
                                    <div className="col-sm-8 position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            className="form-control "
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-secondary position-absolute end-0 top-50 translate-middle-y me-2"
                                            style={{ borderRadius: '0 15px 15px 0', background:'#225374' }}
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="btn btn-success mt-3"
                                        style={{ borderRadius: '15px', background: '#50D68A' }}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div
                            className="col-md-4 d-flex justify-content-center align-items-center"
                            style={{ background: '#225374', padding: '20px' }}
                        >
                            <img
                                src="/dokter.png"
                                alt="Sign Up Image"
                                className="img-fluid"
                                style={{ width: '80%', borderRadius: '15px' }}
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

export default SignUp;
