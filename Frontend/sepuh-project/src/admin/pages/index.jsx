import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Gambar from '/logo.svg';
import Pasien from './pasien';
import Dokter from './dokter';
import Jadwal from './jadwal';
import './index.css';

const Dashboard = () => {
    const [clickedMenu, setClickedMenu] = useState(false);
    const [activeItem, setActiveItem] = useState('');
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
            case 'Profil':
                return navigate('/profil');
            case 'Logout':
                return handleLogout();
            default:
                return navigate('/');
        }
    };

    const handleLogout = () => {
        // Add logout logic here
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
                            {['Home', 'Pasien', 'Dokter', 'Jadwal', 'Profil', 'Logout'].map((item) => (
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
        </Fragment>
    );
};

export default Dashboard;
