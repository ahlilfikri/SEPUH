import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaFileAlt } from 'react-icons/fa';
import Loading from '../../../shared/loading';
import Modal from '../../../shared/modal';
import EditModal from './component/modalEdit';
import AddPasienModal from './component/modalAdd';
import RiwayatModal from './component/modalDetail';
import DeleteModal from '../../../shared/modalDelete';

const Pasien = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPasien, setSelectedPasien] = useState(null);
    const [showAddPasienModal, setShowAddPasienModal] = useState(false);
    const [showRiwayatModal, setShowRiwayatModal] = useState(false);
    const [selectedRiwayat, setSelectedRiwayat] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}pasien`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data.data);
        } catch (error) {
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleEditClick = (pasien) => {
        setSelectedPasien({ ...pasien });
        setShowEditModal(true);
    };

    const handleSaveChanges = async (updatedPasien) => {
        setLoading(true);
        try {
            const response = await axios.put(`${port}user/${updatedPasien.id}`, updatedPasien, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSuccess('Data berhasil diperbarui');
        } catch (error) {
            setError('Tidak dapat menyimpan perubahan, coba lagi');
        } finally {
            setLoading(false);
            setShowEditModal(false);
            fetchData();
        }
    };

    const handleAddPasienClick = () => {
        setShowAddPasienModal(true);
    };

    const handleSaveNewPasien = async (newPasien) => {
        setLoading(true);
        try {
            const response = await axios.post(`${port}user/register`, newPasien, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status === 500){
                setError('Tidak dapat menambahkan pasien, coba lagi');
            } else {
                setSuccess('Pasien berhasil ditambahkan');
            }
        } catch (error) {
            setError('Tidak dapat menambahkan pasien, coba lagi');
        } finally {
            setLoading(false);
            setShowAddPasienModal(false);
            fetchData();
        }
    };

    const handleDeleteClick = (pasien) => {
        setSelectedPasien(pasien);
        setShowDeleteModal(true);
    };

    const handleDeletePasien = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${port}user/${selectedPasien.user._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 500){
                setError('Tidak dapat menghapus pasien, coba lagi');
            } else {
                setSuccess('Pasien berhasil dihapus');
            }
        } catch (error) {
            setError('Tidak dapat menghapus pasien, coba lagi');
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            fetchData();
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setError('');
        setSuccess('');
    };

    const handleCloseAddPasienModal = () => {
        setShowAddPasienModal(false);
    };

    const handleRiwayatClick = (riwayat) => {
        setSelectedRiwayat(riwayat);
        setShowRiwayatModal(true);
    };

    const handleCloseRiwayatModal = () => {
        setShowRiwayatModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <Fragment>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded shadow-sm">
                            <h1 className="mb-4">Filter</h1>
                            <div className="row">
                                <div className="col-6 col-md-3">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Nama" />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="mb-3">
                                        <input type="number" className="form-control" placeholder="Usia" />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Alamat" />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-success">Filter</button>
                                        <button className="btn btn-danger">Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 mt-5">
                    <p className="mb-0 text-light" style={{ fontWeight: 'bold' }}>Daftar Pasien</p>
                    <button className="btn btn-success" onClick={handleAddPasienClick}>Tambah Pasien</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered bg-white rounded shadow-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>No</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Nama</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Usia</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Alamat</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Username</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Email</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Riwayat</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {error === '' && data.map((pasien, index) => (
                                        <tr key={pasien.id}>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{index + 1}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{pasien.user.nama}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{pasien.user.usia}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{pasien.user.alamat}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{pasien.user.username}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{pasien.user.email}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }} className="text-center">
                                                <div className="btn" onClick={() => handleRiwayatClick(pasien.riwayat)}>
                                                    <FaFileAlt style={{ color: '#FFD700', cursor: 'pointer' }} />
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '18px' }} className="text-center">
                                                <div className="btn" onClick={() => handleEditClick(pasien)}>
                                                    <FaEdit style={{ cursor: 'pointer', marginRight: '10px', color: '#000' }} />
                                                </div>
                                                <FaTrashAlt style={{ cursor: 'pointer', color: '#B22222' }} onClick={() => handleDeleteClick(pasien)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleCloseModal} />}
            {success && <Modal data={success} status={'success'} onClose={handleCloseModal} />}
            <EditModal
                show={showEditModal}
                handleClose={handleCloseModal}
                data={selectedPasien}
                handleSave={handleSaveChanges}
            />
            <AddPasienModal
                show={showAddPasienModal}
                handleClose={handleCloseAddPasienModal}
                handleSave={handleSaveNewPasien}
            />
            <RiwayatModal
                show={showRiwayatModal}
                handleClose={handleCloseRiwayatModal}
                riwayat={selectedRiwayat}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeletePasien}
                data={selectedPasien?.user?.nama}
            />
        </Fragment>
    );
};

export default Pasien;
