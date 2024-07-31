import React, { Fragment, useState } from 'react';

const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
const minutes = Array.from({ length: 6 }, (_, index) => String(index * 10).padStart(2, '0'));
const timeOptions = hours.flatMap(hour => minutes.map(minute => `${hour}:${minute}`));
const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const ModalAdd = ({ show, handleClose, handleSave }) => {
    const [formData, setFormData] = useState({
        nama: '',
        spesialisasi: '',
        alamat: '',
        jadwal: [{ hari: '', jamMulai: '', jamSelesai: '' }]
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
            alamat: 'Alamat'
        };
    
        const scheduleFieldNames = {
            hari: 'Hari',
            jamMulai: 'Jam Mulai',
            jamSelesai: 'Jam Selesai'
        };
    
        if (name.startsWith('jadwal_')) {
            const [ , index, field ] = name.split('_');
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
            setFormData({ nama: '', spesialisasi: '', alamat: '', jadwal: [{ hari: '', jamMulai: '', jamSelesai: '' }] });
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
                            <h5 className="modal-title">Tambah Dokter</h5>
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
                                    />
                                    {errors.alamat && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.alamat}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Jadwal Kerja</label>
                                    {formData.jadwal.map((schedule, index) => (
                                        <div key={index}>
                                            <div className="d-flex mb-2">
                                                <select
                                                    className="form-control"
                                                    value={schedule.hari}
                                                    onChange={(e) => handleScheduleChange(index, 'hari', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Pilih Hari</option>
                                                    {daysOfWeek.map(day => (
                                                        <option key={day} value={day}>{day}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    className="form-control"
                                                    value={schedule.jamMulai}
                                                    onChange={(e) => handleScheduleChange(index, 'jamMulai', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Jam Mulai</option>
                                                    {timeOptions.map(time => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    className="form-control"
                                                    value={schedule.jamSelesai}
                                                    onChange={(e) => handleScheduleChange(index, 'jamSelesai', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Jam Selesai</option>
                                                    {timeOptions.map(time => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger ml-2"
                                                    onClick={() => handleRemoveSchedule(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div>
                                                {errors[`jadwal_${index}_hari`] && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors[`jadwal_${index}_hari`]}</div>}
                                                {errors[`jadwal_${index}_jamMulai`] && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors[`jadwal_${index}_jamMulai`]}</div>}
                                                {errors[`jadwal_${index}_jamSelesai`] && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors[`jadwal_${index}_jamSelesai`]}</div>}
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary" onClick={handleAddSchedule}>
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
