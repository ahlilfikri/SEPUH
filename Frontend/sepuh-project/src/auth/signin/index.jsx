import React, { Fragment, useState } from 'react';

const Signin = ({ toggleSigninPopup }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle sign in logic here
        console.log(formData);
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center vh-100"
            style={{ background: 'linear-gradient(135deg, #225374, #28A09E)' }}
        >
            <div
                className="card shadow"
                style={{ borderRadius: '15px', overflow: 'hidden', width: '900px' }}
            >
                <div className="row no-gutters">
                    <div className="col-md-6 p-5">
                        <div className="d-flex justify-content-center mb-4">
                            <h2 className="mr-3" style={{ color: '#003580', cursor: 'pointer', fontWeight: 'bold' }}>Sign In</h2>
                            <h2 className='ms-4' style={{ color: '#8C8C8C', cursor: 'pointer' }}>Sign Up</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row align-items-center mb-3 mt-5">
                                <div className="col-sm-2">
                                    <i className="fa fa-user" style={{ fontSize: '24px' }}></i>
                                </div>
                                <div className="col-sm-10">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{ borderRadius: '15px' }}
                                    />
                                </div>
                            </div>
                            <div className="form-group row align-items-center mb-3">
                                <div className="col-sm-2">
                                    <i className="fa fa-lock" style={{ fontSize: '24px' }}></i>
                                </div>
                                <div className="col-sm-10 mt-3">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={{ borderRadius: '15px' }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
                                <a href="#" style={{ textDecoration: 'none', color: '#003580' }}>Forgot password?</a>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    style={{ borderRadius: '15px', padding: '10px 20px' }}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                    <div
                        className="col-md-6 d-flex justify-content-center align-items-center"
                        style={{ background: '#225374', padding: '20px', height:'430px' }}
                    >
                        <img
                            src="/dokter.png"
                            alt="Sign In Image"
                            className="img-fluid"
                            style={{ width: '80%', borderRadius: '15px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
