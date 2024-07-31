import React, {Fragment} from 'react';

const ModalDetail = ({ show, handleClose, schedule }) => {
    if (!show) return null;

    const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    return (
        <Fragment>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Detail Jadwal Kerja</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ fontSize: '18px' }}>Hari</th>
                                        <th style={{ fontSize: '18px' }}>Jam Mulai</th>
                                        <th style={{ fontSize: '18px' }}>Jam Selesai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {daysOfWeek.map((day) => {
                                        const daySchedule = schedule.find(s => s.hari === day);
                                        return (
                                            <tr key={day}>
                                                <td style={{ fontSize: '18px' }}>{day}</td>
                                                <td style={{ fontSize: '18px' }}>{daySchedule ? daySchedule.jamMulai : '-'}</td>
                                                <td style={{ fontSize: '18px' }}>{daySchedule ? daySchedule.jamSelesai : '-'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </Fragment>
    );
};

export default ModalDetail;
