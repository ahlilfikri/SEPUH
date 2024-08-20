import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const ModalAdd = ({ show, handleClose, handleSave }) => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const [formData, setFormData] = useState({
        pasien: '',
        dokter: '',
        waktu: '',
    });

    const [errors, setErrors] = useState({});
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [times, setTimes] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${port}user/pasien`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.status !== 500) {
                    setPatients(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${port}user/dokter`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.status !== 500) {
                    setDoctors(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchPatients();
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (formData.dokter) {
            const fetchTimes = async () => {
                try {
                    const response = await axios.get(`${port}jadwal/dokter/jadwaldokter?dokter=${formData.dokter}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.data.status !== 500) {
                        setTimes(response.data.data);
                    }
                } catch (error) {
                    console.error('Error fetching times:', error);
                }
            };
            fetchTimes();
        } else {
            setTimes([]);
        }
    }, [formData.dokter]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'waktu') {
            const selectedTime = times.find(time => time._id === value);
            setFormData({
                ...formData,
                [name]: selectedTime ? selectedTime._id : value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        if (!value) {
            newErrors[name] = `${name} is required`;
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.pasien) newErrors.pasien = 'Pasien is required';
        if (!formData.dokter) newErrors.dokter = 'Dokter is required';
        if (!formData.waktu) newErrors.waktu = 'Waktu is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleSave(formData);
            setFormData({
                pasien: '',
                dokter: '',
                waktu: '',
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
                            <h5 className="modal-title">Tambah Jadwal</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                            <form>
                                <div className="form-group">
                                    <label>Pasien</label>
                                    <select
                                        name="pasien"
                                        className="form-control"
                                        value={formData.pasien}
                                        onChange={handleChange}
                                    >
                                        <option value="">Pilih Pasien</option>
                                        {patients?.map((patient, index) => (
                                            <option key={index} value={patient.nama}>
                                                {patient.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.pasien && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.pasien}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Dokter</label>
                                    <select
                                        name="dokter"
                                        className="form-control"
                                        value={formData.dokter}
                                        onChange={handleChange}
                                    >
                                        <option value="">Pilih Dokter</option>
                                        {doctors?.map((doctor, index) => (
                                            <option key={index} value={doctor.nama}>
                                                {doctor.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.dokter && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.dokter}</div>}
                                </div>
                                {formData.dokter && (
                                    <div className="form-group">
                                        <label>Waktu</label>
                                        <select
                                            name="waktu"
                                            className="form-control"
                                            value={formData.waktu}
                                            onChange={handleChange}
                                        >
                                            <option value="">Pilih Waktu</option>
                                            {times?.map((time, index) => (
                                                <option key={index} value={time._id}>
                                                    {time.hari}, {time.jamMulai}-{time.jamSelesai}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.waktu && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.waktu}</div>}
                                    </div>
                                )}
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
