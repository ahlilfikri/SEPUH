import React, { Fragment, useState } from 'react';
import Gambar from '/logo.svg';


const Profile = () => {

    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg navbar-custom" style={{ background: 'linear-gradient(135deg, #225374, #28A09E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    <div className="container-fluid">
                        <a className="navbar-brand d-flex pe-5 pt-4" href="#">
                            <img src={Gambar} alt="" width="32" height="24" className="d-inline-block align-text-top" />
                            <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>SEPUH</p>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </header>
            <div
                className="container-fluid d-flex justify-content-center align-items-center vh-100"
                style={{ background: 'linear-gradient(135deg, #225374, #28A09E)' }}
            ></div>
        </Fragment>
    );
};

export default Profile;
