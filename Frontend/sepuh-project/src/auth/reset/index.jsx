import React, { useState } from 'react';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
            setError('Password must be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, and numbers');
            return;
        }
        setError('');

        alert('Password reset successfully!');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #225374, #28A09E)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '800px' }}>
                <h2 style={{ fontWeight: 'bold' }}>Create New Password</h2>
                <p>Masukkan password baru Anda di bawah ini. Password harus terdiri dari minimal 8 karakter dan mengandung kombinasi huruf besar, huruf kecil, dan angka.</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', color:'#98A3AA'}}>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', color:'#98A3AA' }}>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
