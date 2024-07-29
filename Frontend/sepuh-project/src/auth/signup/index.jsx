import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../shared/loading';
import Modal from '../../shared/modal';

const SignUp = () => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const port = `${import.meta.env.VITE_BASE_URL}`;

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
            const response = await axios.post(`${port}user/register`, formData);
            if (response.data.data) {
                console.log(response.data.data);
                const token = response.data.data;
                sessionStorage.setItem('token', token);
                setSuccess('Berhasil Membuat Akun');
                navigate('/signin');
            } else {
                setError('Username atau Password Tidak Terdaftar');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = () => {
        navigate('/signin');
    }

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
                            <div className="d-flex justify-round">
                                <h2 className='mb-4' onClick={handleSignIn}>Sign In</h2>
                                <h2 className="mb-4 ms-4">Sign Up</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row align-items-center mb-3">
                                    <label style={{ fontSize: '14px' }} htmlFor="nama" className="col-sm-4 col-form-label">Nama</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            name="nama"
                                            className="form-control"
                                            value={formData.nama}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mb-3">
                                    <label style={{ fontSize: '14px' }} htmlFor="email" className="col-sm-4 col-form-label">Email</label>
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
                                    <label style={{ fontSize: '14px' }} htmlFor="password" className="col-sm-4 col-form-label">Password</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mb-3">
                                    <label style={{ fontSize: '14px' }} htmlFor="confirmPassword" className="col-sm-4 col-form-label">Confirm Password</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            style={{ borderRadius: '15px' }}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success btn-block mt-3"
                                    style={{ borderRadius: '15px' }}
                                >
                                    Sign Up
                                </button>
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
            {loading && <Loading></Loading>}
            {error != '' && <Modal data={error} status={'error'}></Modal>}
        </Fragment>
    );
};

export default SignUp;
