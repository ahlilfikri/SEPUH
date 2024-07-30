import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../shared/loading';
import Modal from '../../shared/modal';
import Gambar from '/logo.svg';
import Pasien from './pasien';
import Dokter from './dokter';
import Jadwal from './jadwal';
import Profile from './profile';
import './index.css';

const Dashboard = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;

    const [clickedMenu, setClickedMenu] = useState(true);
    const [activeItem, setActiveItem] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const handleClickMenu = () => {
        setClickedMenu(!clickedMenu);
    };
    const [Content, setContent] = useState(<Pasien></Pasien>);
    const handleItemClick = (item) => {
        setActiveItem(item);
        switch (item) {
            case 'Home':
                return navigate('/');
            case 'Pasien':
                return setContent(<Pasien></Pasien>);
            case 'Dokter':
                return setContent(<Dokter></Dokter>);
            case 'Jadwal':
                return setContent(<Jadwal></Jadwal>);
            case 'Profile':
                return navigate('/profile');
            case 'Logout':
                console.log('test');
                return handleLogout();
            default:
                return setContent(<Pasien></Pasien>);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/signin');
                }, 3000);
            }
            const result = await axios.post(`${port}user/logout/${token}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(result);
            sessionStorage.removeItem('token');
            setSuccess('Berhasil Logout');
            setTimeout(() => {
                navigate('/signin');
            }, 3000);
        } catch (error) {
            console.log(error);
            if (error.response?.status === 400) {
                sessionStorage.removeItem('token');
                setSuccess('Berhasil Logout');
                setTimeout(() => {
                    navigate('/signin');
                }, 3000); 
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError('');
        setSuccess('');
    };

    return (
        <Fragment>
            <div className="container-fluid p-0">
                <div
                    className="menu-button"
                    onClick={handleClickMenu}
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: clickedMenu ? '23.2%' : '10px',
                        right: clickedMenu ? '10px' : 'auto',
                        zIndex: 1000,
                        cursor: 'pointer',
                        fontSize: '24px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#225374',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: clickedMenu ? '#225374' : 'white'
                    }}
                >
                    {clickedMenu ? 'x' : '='}
                </div>
                <div
                    className="menu-button"
                    onClick={handleClickMenu}
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: clickedMenu ? '23.2%' : '10px',
                        right: clickedMenu ? '10px' : 'auto',
                        zIndex: 1000,
                        cursor: 'pointer',
                        fontSize: '24px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#225374',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: clickedMenu ? '#225374' : 'white'
                    }}
                >
                    {clickedMenu ? 'x' : '='}
                </div>
                <div className="row p-0 m-0">
                    <div className={`sidebar text-center p-0 m-0 ${clickedMenu ? 'open' : ''}`}>
                        <div className="top d-flex justify-content-around align-items-center">
                            <div className="logo d-flex align-items-center">
                                <img src={Gambar} className="px-0 mx-0" alt="Logo" />
                                <p className="pt-3" style={{ marginLeft: '-15px', fontSize: '20px', fontWeight: 'bold', color: '#225374' }}>SEPUH</p>
                            </div>
                            <i className="fa fa-user" style={{ fontSize: '24px', color: '#225374' }}></i>
                        </div>
                        <ul className="menu-list">
                            {['Home', 'Pasien', 'Dokter', 'Jadwal', 'Profile', 'Logout'].map((item) => (
                                <li
                                    key={item}
                                    className={`mx-auto my-3 p-2 menu-item ${activeItem === item ? 'text-white' : ''}`}
                                    style={{
                                        width: '80%',
                                        listStyle: 'none',
                                        cursor: 'pointer',
                                        background: `${activeItem === item ? '#18496A' : 'none'}`,
                                        fontSize: '20px', fontWeight: 'bold', color: '#225374'
                                    }}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`content p-0 m-0 ${clickedMenu ? 'shrink' : ''}`}>
                        <h1 className="bg-warning px-5" style={{ background: 'linear-gradient(135deg, #225374, #28A09E)', minHeight: '100vh' }}>
                            {Content}
                        </h1>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleClose} />}
            {success && <Modal data={success} status={'success'} onClose={handleClose} />}
        </Fragment>
    );
};

export default Dashboard;
