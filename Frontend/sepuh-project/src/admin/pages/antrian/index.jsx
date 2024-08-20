import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../../shared/loading';
import Modal from '../../../shared/modal';

const Antrian = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const [doctors, setDoctors] = useState([]);
    const [jadwalDokter, setJadwalDokter] = useState([]);
    const [data, setData] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedJadwal, setSelectedJadwal] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = sessionStorage.getItem('token');

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`${port}user/dokter`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.status === 500) {
                setError('Tidak dapat mengambil jadwal dokter, coba muat ulang laman');
            } else {
                setDoctors(response.data.data);
            }
        } catch (error) {
            setError('Tidak dapat mengambil data dokter, coba muat ulang laman');
        }
    };

    const fetchJadwal = async (doctorId) => {
        console.log(doctorId);
        
        try {
            const response = await axios.get(`${port}jadwal/dokter/jadwaldokter`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: { dokter: doctorId },
            });
            if (response.data.status === 500) {
                setError('Tidak dapat mengambil jadwal dokter, coba muat ulang laman');
            } else {
                setJadwalDokter(response.data.data);
            }
        } catch (error) {
            setError('Tidak dapat mengambil jadwal dokter, coba muat ulang laman');
        }
    };

    const fetchAntrian = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}Antrian/filter`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    dokter: selectedDoctor,
                    jadwal: selectedJadwal,
                }
            });

            if (response.data.status === 500) {
                setError('Tidak dapat mengambil data Antrian, coba muat ulang laman');
            } else {
                setData(response.data.data.filter(item => item.antrian === item.antrianAktif));
            }
        } catch (error) {
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [token]);

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        setSelectedDoctor(doctorId);
        setSelectedJadwal('');
        setData([]);
        if (doctorId) {
            fetchJadwal(doctorId);
        }
    };

    const handleJadwalChange = (e) => {
        const jadwalId = e.target.value;
        setSelectedJadwal(jadwalId);
        if (jadwalId) {
            fetchAntrian();
        }
    };

    return (
        <Fragment>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded shadow-sm">
                            <h1 className="mb-4">Filter</h1>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="mb-3">
                                        <select className="form-control" value={selectedDoctor} onChange={handleDoctorChange}>
                                            <option value="">Pilih Dokter</option>
                                            {doctors.map((doctor) => (
                                                <option key={doctor._id} value={doctor._id}>{doctor.nama}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {selectedDoctor && (
                                    <div className="col-12 col-sm-6 col-md-3">
                                        <div className="mb-3">
                                            <select className="form-control" value={selectedJadwal} onChange={handleJadwalChange}>
                                                <option value="">Pilih Jadwal</option>
                                                {jadwalDokter.map((jadwal) => (
                                                    <option key={jadwal._id} value={jadwal._id}>
                                                        {jadwal.hari} {jadwal.jamMulai} - {jadwal.jamSelesai}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {selectedJadwal && (
                    <div>
                        <div className="d-flex justify-content-between align-items-center p-3 mt-5">
                            <p className="mb-0 text-light" style={{ fontWeight: 'bold' }}>Daftar Antrian</p>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered bg-white rounded shadow-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>No</th>
                                                <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Nama</th>
                                                <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Stok</th>
                                                <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {error === '' && data.map((antrian, index) => (
                                                <tr key={index}>
                                                    <td style={{ fontSize: '18px', fontWeight: '400' }}>{index + 1}</td>
                                                    <td style={{ fontSize: '18px', fontWeight: '400' }}>{antrian.nama}</td>
                                                    <td style={{ fontSize: '18px', fontWeight: '400' }}>{antrian.stok}</td>
                                                    <td style={{ fontSize: '18px', fontWeight: '400' }}>{antrian.harga}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {loading && <Loading />}
                {error && <Modal data={error} status={'error'} onClose={() => setError('')} />}
            </div>
        </Fragment>
    );
};

export default Antrian;
