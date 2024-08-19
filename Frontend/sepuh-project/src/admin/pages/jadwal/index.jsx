import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Loading from '../../../shared/loading';
import Modal from '../../../shared/modal';
import EditModal from './component/modalEdit';
import AddJadwalModal from './component/modalAdd';
import DeleteModal from '../../../shared/modalDelete';
import useDebounce from '../../../shared/debouncedValue';
import Pagination from '../../../shared/pagination';

const Jadwal = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const token = sessionStorage.getItem('token');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);
    const [showAddJadwalModal, setShowAddJadwalModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filters, setFilters] = useState({
        pasien: '',
        dokter: '',
        status: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const debouncedFilters = useDebounce(filters, 1500);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}jadwal`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);

            if (!response.data.data) {
                setError('Tidak dapat mengambil data, coba muat ulang laman');
            } else {
                setData(response.data.data);
                // setTotalPages(response.data.data.totalPages); 
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData(currentPage);
        }
    }, [debouncedFilters, token, currentPage]);

    const handleEditClick = (jadwal) => {
        setSelectedJadwal({ ...jadwal });
        setShowEditModal(true);
    };

    const handleSaveChanges = async (updatedJadwal) => {
        setShowEditModal(false);
        setLoading(true);
        try {
            const response = await axios.put(`${port}jadwal/${updatedJadwal.id}`, updatedJadwal, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat menyimpan perubahan, coba lagi');
            } else {
                setSuccess('Data berhasil diperbarui');
            }
        } catch (error) {
            setError('Tidak dapat menyimpan perubahan, coba lagi');
        } finally {
            setLoading(false);
            fetchData(currentPage);
        }
    };

    const handleAddJadwalClick = () => {
        setShowAddJadwalModal(true);
    };

    const handleSaveNewJadwal = async (newJadwal) => {
        setShowAddJadwalModal(false);
        setLoading(true);
        try {
            const response = await axios.post(`${port}jadwal`, newJadwal, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat menambahkan jadwal, coba lagi');
            } else {
                setSuccess('Jadwal berhasil ditambahkan');
            }
        } catch (error) {
            console.error('Add Error:', error);
            setError('Tidak dapat menambahkan jadwal, coba lagi');
        } finally {
            setLoading(false);
            fetchData(currentPage);
        }
    };

    const handleDeleteClick = (jadwal) => {
        setSelectedJadwal(jadwal);
        setShowDeleteModal(true);
    };

    const handleDeleteJadwal = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${port}jadwal/${selectedJadwal._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat menghapus jadwal, coba lagi');
            } else {
                setSuccess('Jadwal berhasil dihapus');
            }
        } catch (error) {
            console.error('Delete Error:', error);
            setError('Tidak dapat menghapus jadwal, coba lagi');
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            fetchData(currentPage);
        }
    };

    const handleApprove = async (jadwal) => {
        setLoading(true);
        try {
            const response = await axios.put(`${port}jadwal/${jadwal._id}`, { status: 'disetujui' }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat menyetujui jadwal, coba lagi');
            } else {
                setSuccess('Jadwal berhasil disetujui');
            }
        } catch (error) {
            console.error('Approve Error:', error);
            setError('Tidak dapat menyetujui jadwal, coba lagi');
        } finally {
            setLoading(false);
            fetchData(currentPage);
        }
    };

    const handleReject = async (jadwal) => {
        setLoading(true);
        try {
            const response = await axios.put(`${port}jadwal/${jadwal._id}`, { status: 'ditolak' }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat menolak jadwal, coba lagi');
            } else {
                setSuccess('Jadwal berhasil ditolak');
            }
        } catch (error) {
            setError('Tidak dapat menolak jadwal, coba lagi');
        } finally {
            setLoading(false);
            fetchData(currentPage);
        }
    };

    const determineStatus = (jadwal) => {
        if (jadwal.status === 'disetujui') {
            const waktuMulai = new Date(jadwal.waktu);
            const sekarang = new Date();
            const satuJamKemudian = new Date(waktuMulai.getTime() + 60 * 60 * 1000);

            if (sekarang < waktuMulai) {
                return 'akan datang';
            } else if (sekarang >= waktuMulai && sekarang <= satuJamKemudian) {
                return 'sedang berlangsung';
            } else {
                return 'selesai';
            }
        }

        return jadwal.status;
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setError('');
        setSuccess('');
    };

    const handleCloseAddJadwalModal = () => {
        setShowAddJadwalModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleInputChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleClearFilters = () => {
        setFilters({ pasien: '', dokter: '', status: '' });
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
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
                                        <input type="text" className="form-control" placeholder="Pasien" name="pasien" value={filters.pasien} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Dokter" name="dokter" value={filters.dokter} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-success" onClick={() => fetchData(currentPage)}>Filter</button>
                                        <button className="btn btn-danger" onClick={handleClearFilters}>Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 mt-5">
                    <p className="mb-0 text-light" style={{ fontWeight: 'bold' }}>Daftar Jadwal</p>
                    <button className="btn btn-success" onClick={handleAddJadwalClick}>Tambah Jadwal</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered bg-white rounded shadow-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>No</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Pasien</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Dokter</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Waktu</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Antrian  </th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {error === '' && data.map((jadwal, index) => (
                                        <tr key={index}>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{index + 1 + (currentPage - 1) * 20}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{jadwal?.pasien?.nama ? jadwal?.pasien?.nama : 'data tidak ditemukan'}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{jadwal?.dokter?.nama ? jadwal?.dokter?.nama : 'data tidak ditemukan'}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{jadwal?.dokter?.waktu?.hari}{jadwal?.dokter?.waktu?.jamMulai}{jadwal?.dokter?.waktu?.jamSelesai}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{determineStatus(jadwal)}</td>
                                            <td style={{ fontSize: '18px' }} className="text-center">
                                                {jadwal.status === 'diajukan' ? (
                                                    <>
                                                        <button className="btn btn-success mr-2 m-1" onClick={() => handleApprove(jadwal)}>Setujui</button>
                                                        <button className="btn btn-danger m-1" onClick={() => handleReject(jadwal)}>Tolak</button>
                                                        <div className="btn m-1" onClick={() => handleEditClick(jadwal)}>
                                                            <FaEdit style={{ cursor: 'pointer', marginRight: '10px', color: '#000' }} />
                                                        </div>
                                                        <FaTrashAlt className='m-1' style={{ cursor: 'pointer', color: '#B22222' }} onClick={() => handleDeleteClick(jadwal)} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="btn m-1" onClick={() => handleEditClick(jadwal)}>
                                                            <FaEdit style={{ cursor: 'pointer', marginRight: '10px', color: '#000' }} />
                                                        </div>
                                                        <FaTrashAlt className='m-1' style={{ cursor: 'pointer', color: '#B22222' }} onClick={() => handleDeleteClick(jadwal)} />
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="py-1"></div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
                <div className="py-3"></div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleCloseModal} />}
            {success && <Modal data={success} status={'success'} onClose={handleCloseModal} />}
            <EditModal
                show={showEditModal}
                handleClose={handleCloseModal}
                data={selectedJadwal}
                handleSave={handleSaveChanges}
            />
            <AddJadwalModal
                show={showAddJadwalModal}
                handleClose={handleCloseAddJadwalModal}
                handleSave={handleSaveNewJadwal}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteJadwal}
                data={`Nama pasien: ${selectedJadwal?.pasien?.nama} pada ${new Date(selectedJadwal?.waktu).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', dateStyle: 'full', timeStyle: 'short' })}`}
            />
        </Fragment>
    );
};

export default Jadwal;
