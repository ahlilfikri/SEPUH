import React, { Fragment, useState } from 'react';

const ModalAdd = ({ show, handleClose, handleSave }) => {
    const [formData, setFormData] = useState({
        nama: '',
        usia: '',
        alamat: '',
        username: '',
        email: '',
        password: '',
        role: 1,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        const fieldNames = {
            nama: 'Nama',
            usia: 'Usia',
            alamat: 'Alamat',
            username: 'Username',
            email: 'Email',
            password : 'Password'
        };


         if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                newErrors[name] = 'Invalid email address';
            } else {
                delete newErrors[name];
            }
        } else if (!value) {
            newErrors[name] = `${fieldNames[name]} is required`;
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nama) newErrors.nama = 'Nama is required';
        if (!formData.usia) newErrors.usia = 'Usia is required';
        if (!formData.alamat) newErrors.alamat = 'Alamat is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleSave(formData);
            setFormData({
                nama: '',
                usia: '',
                alamat: '',
                username: '',
                email: '',
                password: ''
            });
            setErrors({});
        }
    };

    if (!show) return null;

    return (
        <Fragment>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Tambah Apoteker</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                            <form>
                                <div className="form-group">
                                    <label>Nama</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        className="form-control"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.nama && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.nama}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Usia</label>
                                    <input
                                        type="number"
                                        name="usia"
                                        className="form-control"
                                        value={formData.usia}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.usia && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.usia}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Alamat</label>
                                    <input
                                        type="text"
                                        name="alamat"
                                        className="form-control"
                                        value={formData.alamat}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.alamat && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.alamat}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.username && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.username}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.password && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.password}</div>}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </Fragment>
    );
};

export default ModalAdd;
