import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../shared/loading';
import Modal from '../../shared/modal';
import Gambar from '/logo.svg';
import Pasien from './pasien';
import Dokter from './dokter';
import Jadwal from './jadwal';
import Antrian from './antrian';
import Apoteker from './apoteker';
import Obat from './obat';
import Profile from '../../user/pages/profile';
import {jwtDecode} from 'jwt-decode';
import './index.css';

const Dashboard = () => {
  const port = `${import.meta.env.VITE_BASE_URL}`;
  const [clickedMenu, setClickedMenu] = useState(true);
  const [activeItem, setActiveItem] = useState('Pasien');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [dataRole, setDataRole] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickMenu = () => {
    setClickedMenu(!clickedMenu);
  };

  const [Content, setContent] = useState(<Pasien />);
  const handleItemClick = (item) => {
    setActiveItem(item);
    switch (item) {
      case 'Home':
        return navigate('/');
      case 'Pasien':
        return setContent(<Pasien />);
      case 'Apoteker':
        return setContent(<Apoteker />);
      case 'Dokter':
        return setContent(<Dokter />);
      case 'Obat':
        return setContent(<Obat />);
      case 'Jadwal':
        return setContent(<Jadwal />);
      case 'Antrian':
        return setContent(<Antrian />);
      case 'Profile':
        return navigate('/profile');
      case 'Logout':
        return handleLogout();
      default:
        return setContent(<Pasien />);
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
        }, 1500);
      }
      await axios.post(
        `${port}user/logout/${token}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sessionStorage.removeItem('token');
      setSuccess('Berhasil Logout');
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
    } catch (error) {
      if (error.response?.status === 400) {
        sessionStorage.removeItem('token');
        setSuccess('Berhasil Logout');
        setTimeout(() => {
          navigate('/signin');
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setSuccess('');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setDataRole(decodedToken.role);
    }
  }, []);

  // Define the menu items based on the role
  const menuItems = [
    { name: 'Home', roles: [3, 1] },
    { name: 'Pasien', roles: [3] },
    { name: 'Apoteker', roles: [3] },
    { name: 'Dokter', roles: [3] },
    { name: 'Obat', roles: [3, 1] },
    { name: 'Jadwal', roles: [3] },
    { name: 'Antrian', roles: [3] },
    { name: 'Profile', roles: [0,1,2,3] },
    { name: 'Logout', roles: [3, 1] },
  ];

  // Filter the items based on the user's role
  const accessibleMenuItems = menuItems.filter((item) => item.roles.includes(dataRole));

  return (
    <Fragment>
      <div className="container-fluid p-0">
        <div
          className="menu-button"
          onClick={handleClickMenu}
          style={{
            position: 'absolute',
            top: '0px',
            left: clickedMenu ? (windowWidth < 900 ? '97%' : '23.2%') : '10px',
            right: clickedMenu ? '10px' : 'auto',
            zIndex: 1000,
            cursor: 'pointer',
            fontSize: '24px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#225374',
            fontWeight: 'bold',
            color: clickedMenu ? '#225374' : 'white'
          }}
        >
          {clickedMenu ? 'x' : <i className="fa-solid fa-bars"></i>}
        </div>
        <div className="row p-0 m-0">
          <div className={`sidebar text-center p-0 m-0 ${clickedMenu ? 'open' : ''}`}>
            <div className="top d-flex justify-content-around align-items-center">
              <div className="logo d-flex align-items-center">
                <img src={Gambar} className="px-0 mx-0" alt="Logo" />
                <p
                  className="pt-3"
                  style={{
                    marginLeft: '-15px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#225374',
                  }}
                >
                  SEPUH
                </p>
              </div>
              <i className="fa fa-user" style={{ fontSize: '24px', color: '#225374' }}></i>
            </div>
            <ul className="menu-list">
              {accessibleMenuItems.map((item) => (
                <li
                  key={item.name}
                  className={`mx-auto my-3 p-2 menu-item ${activeItem === item.name ? 'text-white' : ''}`}
                  style={{
                    width: '80%',
                    listStyle: 'none',
                    cursor: 'pointer',
                    background: `${activeItem === item.name ? '#18496A' : 'none'}`,
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#225374',
                  }}
                  onClick={() => handleItemClick(item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={`content p-0 m-0 ${clickedMenu ? 'shrink' : ''}`}>
            <h1
              className="bg-warning px-5 p-0 m-0"
              style={{
                background: 'linear-gradient(135deg, #225374, #28A09E)',
                minHeight: '100vh',
              }}
            >
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
