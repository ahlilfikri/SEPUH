import React, { Fragment } from 'react';
import Gambar from '/vite.svg'

const Home = () => {
    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg navbar-primary bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={Gambar} alt="" width="30" height="24" className="d-inline-block align-text-top"/>SEPUH
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">
                                        <i className="fas fa-user"></i> Home
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="position -relative" style={{ height : '95vh' , background: 'linear-gradient(135deg, #225374, #28A09E)' }}>
                 <h1>Welcome</h1>
            </main>

        </Fragment>
    );
};

export default Home;
