import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../../shared/loading';
import Modal from '../../shared/modal';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const decodedToken = jwtDecode(token); 
            const response = await axios.put(
                `${port}user/reset/${decodedToken.id}`,
                { oldPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status === 200) {
                setLoading(false);
                setSuccess('Reset password berhasil');
                setTimeout(() => {
                    navigate('/profile')
                }, 3000);
            } else {
                setError('Reset password gagal, silahkan coba lagi.');
            }
        } catch (err) {
            setError('Reset password gagal, silahkan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (
            newPassword.length < 8
        ) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setError('');
        handleUpdate(); // Call handleUpdate to make the API request
    };

    const handleClose = () => {
        setError('');
        setSuccess('');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #225374, #28A09E)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '800px' }}>
                <h2 style={{ fontWeight: 'bold' }}>Create New Password</h2>
                <p>Masukkan password baru Anda di bawah ini. Password harus terdiri dari minimal 8 karakter</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', color: '#98A3AA' }}>Old Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#007BFF'
                                }}
                            >
                                {showOldPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
<<<<<<< Updated upstream
                        <label style={{ fontWeight: 'bold', color: '#98A3AA' }}>New Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#007BFF'
                                }}
                            >
                                {showNewPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', color: '#98A3AA' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#007BFF'
                                }}
                            >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
=======
                        <label style={{ fontWeight: 'bold', color:'#98A3AAg' }}>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
>>>>>>> Stashed changes
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
                        Reset Password
                    </button>
                </form>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleClose} />}
            {success && <Modal data={success} status={'success'} onClose={handleClose} />}
        </div>
    );
};

export default ResetPassword;
