import React, { Fragment, useState, useEffect } from 'react';
import Gambar from '/logo.svg';
import Navbar from '../../../shared/navbar';

const Profile = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleIsLogin = () => {
        const token = sessionStorage.getItem('token');
        setIsLogin(token != null);
    };

    useEffect(() => {
        handleIsLogin();
    }, []);

    return (
        <Fragment>
            <header>
                <Navbar isLogin={isLogin} />  {/* Use the Navbar component and pass isLogin as a prop */}
            </header>
            <div
                className="container-fluid d-flex justify-content-center align-items-center vh-100"
                style={{ background: 'linear-gradient(135deg, #225374, #28A09E)' }}
            >
                <div className="text-center text-white p-4">
                    <img src={Gambar} alt="Logo" className="img-fluid mb-3" style={{ width: '100px' }} />
                    <h3>Profil Anda</h3>
                    <div className="profile-info mt-4">
                        <div className="profile-item p-3 mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
                            <p><strong>Nama:</strong> Nama Pengguna</p>
                        </div>
                        <div className="profile-item p-3 mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
                            <p><strong>Email:</strong> email@domain.com</p>
                        </div>
                        <div className="profile-item p-3 mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
                            <p><strong>Password:</strong> ********</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Profile;
