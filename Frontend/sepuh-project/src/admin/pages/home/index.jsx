import React, { Fragment, useEffect, useState } from 'react';
import Gambar from '/logo.svg';
import Dokter from '/doksuster.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    const handleSignin = () => {
        navigate('/signin');
    }

    const handleProfile = () => {
        navigate('/profile');
    }
    
    const handleDashboard = () => {
        navigate('/dashboard');
    }

    const handleIsLogin = () => {
        const token = sessionStorage.getItem('token');
        setIsLogin(token != null);
    };

    useEffect(() => {
        handleIsLogin();
    }, []); // This effect should run only once, hence an empty dependency array

    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg bg-light" style={{ background: 'linear-gradient(135deg, #225374, #28A09E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
                                    {
                                        !isLogin &&
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
            </header>
            <main className="position-relative" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #225374, #28A09E)' }}>
                <div className="container text-white h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-md-6 mx-auto text-center text-md-start pt-5 pt-md-0">
                            <h1>SEPUH!</h1>
                            <h2>Sehat Bersama, Sembuh Bersama.</h2>
                            <p>SEPUH membantu Sistem Penjadwalan untuk Hospital yang berguna untuk memanajemen informasi pasien, manajemen informasi dan jadwal dokter dan jadwal periksa.</p>
                            <button className="btn btn-read-more bg-success text-center text-white">Read more...</button>
                        </div>
                        <div className="col-md-6 text-center pt-5">
                            <img src={Dokter} alt="" className="img-fluid" style={{ maxHeight: '700px' }} />
                        </div>
                    </div>
                </div>
                <div className="circle-background position-absolute"></div>
            </main>
        </Fragment >
    );
};

export default Home;
