import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Dokter = () => {
    const [dokters, setDokters] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sepuh-api.vercel.app/dokter', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDokters(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

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
                <p className='pt-5 text-light' style={{ fontWeight: 'bold' }}>Daftar Dokter</p>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-bordered bg-white rounded shadow-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Usia</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Spesialisasi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dokters.map((dokter) => (
                                    <tr key={dokter.id}>
                                        <td>{dokter.nama}</td>
                                        <td>{dokter.usia}</td>
                                        <td>{dokter.alamat}</td>
                                        <td>{dokter.spesialisasi}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dokter;
