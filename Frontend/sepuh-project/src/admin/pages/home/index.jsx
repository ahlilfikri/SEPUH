import React, { Fragment } from 'react';
import Gambar from '/logo.svg'
import Dokter from '/doksuster.png'

const Home = () => {
    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg bg-light" style={{ background: 'linear-gradient(135deg, #225374, #28A09E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    <div className="container-fluid">
                        <a className="navbar-brand d-flex pe-5 pt-4" href="#">
                            <img src={Gambar} alt="" width="32" height="24" className="d-inline-block align-text-top" style={{ fontSize: '24px' }} />
                            <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>SEPUH</p>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link active d-flex align-items-center pe-5 pt-4" aria-current="page" href="#">
                                        <p style={{ fontWeight: 'bold', margin: 0, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="pe-4">Home</p>
                                        <i className="fas fa-user " style={{ fontSize: '24px', color: '#28A09E' }}></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="position-relative" style={{ height: 'vh', background: 'linear-gradient(135deg, #225374, #28A09E)' }}>
                <div className="container d-flex align-items-center justify-content-between h-100 text-white">
                    <div className="info text-justify mx-auto" style={{ maxWidth: '600px' }}>
                        <h1>SEPUH!</h1>
                        <h2>Sehat Bersama, Sembuh Bersama.</h2>
                        <p>SEPUH membantu Sistem Penjadwalan untuk Hospital yang berguna untuk memanajemen informasi pasien, manajemen informasi dan jadwal dokter dan jadwal periksa.</p>
                        <button className="btn btn-read-more bg-success text-center">Read more...</button>
                    </div>
                    <div className="doctor-image position-relative">
                        <img src={Dokter} alt="" className="img-fluid" style={{ height: '700px', width: '700px' }} />
                    </div>
                </div>
                <div className="circle-background position-absolute"></div>
            </main>
        </Fragment>
    );
};

export default Home;
