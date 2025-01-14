import React, { useState, useEffect, Fragment } from 'react';

const ModalEdit = ({ show, handleClose, handleSave, data }) => {
    const [formData, setFormData] = useState({
        id: '',
        nama: '',
        spesialisasi: '',
        alamat: '',
        usia: '',
        username: '',
        email: '',
        role: 2, // Fixed role value
        jadwal: [{ hari: '', jamMulai: '', jamSelesai: '' }]
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setFormData({
                id: data._id || '',
                nama: data.nama || '',
                spesialisasi: data.spesialisasi || '',
                alamat: data.alamat || '',
                usia: data.usia || '',
                username: data.username || '',
                email: data.email || '',
                role: data.role || 2, // Keep the role value
                jadwal: data.jadwal || [{ hari: '', jamMulai: '', jamSelesai: '' }]
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleScheduleChange = (index, field, value) => {
        const updatedJadwal = [...formData.jadwal];
        updatedJadwal[index][field] = value;
        setFormData({
            ...formData,
            jadwal: updatedJadwal,
        });
        validateField(`jadwal_${index}_${field}`, value);
    };

    const handleAddSchedule = () => {
        setFormData({
            ...formData,
            jadwal: [...formData.jadwal, { hari: '', jamMulai: '', jamSelesai: '' }],
        });
    };

    const handleRemoveSchedule = (index) => {
        const updatedJadwal = formData.jadwal.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            jadwal: updatedJadwal,
        });
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        const fieldNames = {
            nama: 'Nama',
            spesialisasi: 'Spesialisasi',
            alamat: 'Alamat',
            usia: 'Usia',
            username: 'Username',
            email: 'Email'
        };

        const scheduleFieldNames = {
            hari: 'Hari',
            jamMulai: 'Jam Mulai',
            jamSelesai: 'Jam Selesai'
        };

        if (name.startsWith('jadwal_')) {
            const [, index, field] = name.split('_');
            const fieldName = scheduleFieldNames[field];
            if (!value) {
                newErrors[name] = `${fieldName} is required`;
            } else {
                delete newErrors[name];
            }
        } else {
            const fieldName = fieldNames[name];
            if (!value) {
                newErrors[name] = `${fieldName} is required`;
            } else {
                delete newErrors[name];
            }
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nama) newErrors.nama = 'Nama is required';
        if (!formData.spesialisasi) newErrors.spesialisasi = 'Spesialisasi is required';
        if (!formData.usia) newErrors.usia = 'Usia is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';

        formData.jadwal.forEach((schedule, index) => {
            if (!schedule.hari) newErrors[`jadwal_${index}_hari`] = 'Hari is required';
            if (!schedule.jamMulai) newErrors[`jadwal_${index}_jamMulai`] = 'Jam Mulai is required';
            if (!schedule.jamSelesai) newErrors[`jadwal_${index}_jamSelesai`] = 'Jam Selesai is required';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleSave(formData);
        }
    };

    const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const generateTimeOptions = () => {
        const options = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 10) {
                const hour = h < 10 ? `0${h}` : h;
                const minute = m < 10 ? `0${m}` : m;
                options.push(`${hour}:${minute}`);
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    if (!show) return null;

    return (
        <Fragment>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Dokter</h5>
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
                                    <label>Spesialisasi</label>
                                    <input
                                        type="text"
                                        name="spesialisasi"
                                        className="form-control"
                                        value={formData.spesialisasi}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.spesialisasi && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.spesialisasi}</div>}
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
                                    <label>Jadwal</label>
                                    {formData.jadwal.map((schedule, index) => (
                                        <div key={index} className="mb-3">
                                            <select
                                                className="form-control mb-2"
                                                value={schedule.hari}
                                                onChange={(e) => handleScheduleChange(index, 'hari', e.target.value)}
                                            >
                                                <option value="">Pilih Hari</option>
                                                {daysOfWeek.map((day) => (
                                                    <option key={day} value={day}>
                                                        {day}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors[`jadwal_${index}_hari`] && (
                                                <div className="text-danger mt-2" style={{ fontSize: '12px' }}>
                                                    {errors[`jadwal_${index}_hari`]}
                                                </div>
                                            )}
                                            <div className="row">
                                                <div className="col">
                                                    <select
                                                        className="form-control mb-2"
                                                        value={schedule.jamMulai}
                                                        onChange={(e) => handleScheduleChange(index, 'jamMulai', e.target.value)}
                                                    >
                                                        <option value="">Jam Mulai</option>
                                                        {timeOptions.map((time) => (
                                                            <option key={time} value={time}>
                                                                {time}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors[`jadwal_${index}_jamMulai`] && (
                                                        <div className="text-danger mt-2" style={{ fontSize: '12px' }}>
                                                            {errors[`jadwal_${index}_jamMulai`]}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col">
                                                    <select
                                                        className="form-control"
                                                        value={schedule.jamSelesai}
                                                        onChange={(e) => handleScheduleChange(index, 'jamSelesai', e.target.value)}
                                                    >
                                                        <option value="">Jam Selesai</option>
                                                        {timeOptions.map((time) => (
                                                            <option key={time} value={time}>
                                                                {time}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors[`jadwal_${index}_jamSelesai`] && (
                                                        <div className="text-danger mt-2" style={{ fontSize: '12px' }}>
                                                            {errors[`jadwal_${index}_jamSelesai`]}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-2 d-flex align-items-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleRemoveSchedule(index)}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddSchedule}>
                                        Add Schedule
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </Fragment>
    );
};

export default ModalEdit;
