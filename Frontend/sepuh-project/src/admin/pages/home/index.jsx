import React, { Fragment, useEffect, useState, useRef } from 'react';
import Gambar from '/logo.svg';
import Dokter from '/doksuster.png';
import Navbar from '../../../shared/navbar';

const Home = () => {
    const [isLogin, setIsLogin] = useState(false);

    const sectionRef = useRef(null);

    const handleScroll = () => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleIsLogin = () => {
        const token = sessionStorage.getItem('token');
        setIsLogin(token != null);
    };

    useEffect(() => {
        handleIsLogin();
    }, []);

    return (
        <Fragment>
            <header>
                <Navbar isLogin={isLogin} />  {/* Use the Navbar component and pass isLogin as a prop */}
            </header>
            <main className="position-relative" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #225374, #28A09E)' }}>
                <div className="container text-white" style={{ minHeight: '100vh' }}>
                    <div className="row align-items-center h-100">
                        <div className="col-md-6 text-start pt-5 pt-md-0">
                            <h1>SEPUH!</h1>
                            <h2>Sehat Bersama, Sembuh Bersama.</h2>
                            <p style={{textAlign:'justify'}}>SEPUH membantu Sistem Penjadwalan untuk Hospital yang berguna untuk memanajemen informasi pasien, manajemen informasi dan jadwal dokter dan jadwal periksa.</p>
                            <button className="btn btn-read-more bg-success text-white" onClick={handleScroll}>Baca Selengkapnya</button>
                        </div>
                        <div className="col-md-6 text-center pt-5">
                            <img src={Dokter} alt="" className="img-fluid" style={{ maxHeight: '700px' }} />
                        </div>
                    </div>
                </div>

                <div className="container text-white pt-5">
                    <h1 style={{ textAlign: 'center', marginTop:'60px', marginBottom:'30px' }} ref={sectionRef}>TENTANG KAMI</h1>
                </div>
                
                <div className="circle-background position-absolute"></div>
                <div className="container text-white h-100">
                    <div className="row align-items-start h-100">
                        <div className="col-md-6 text-start pt-5 pt-md-0">
                            <h2>APA ITU SEPUH?</h2>
                            <h3>Sehat Bersama, Sembuh Bersama.</h3>
                            <p style={{ textAlign: 'justify' }}>SEPUH adalah sistem penjadwalan untuk rumah sakit yang dirancang untuk memanajemen informasi pasien, manajemen informasi dan jadwal dokter, serta jadwal periksa. Sistem ini membantu rumah sakit dalam mengatur dan mengelola berbagai aspek administrasi dan operasional yang berkaitan dengan pelayanan kesehatan.</p>
                        </div>
                        <div className="col-md-6 text-start pt-5 pt-md-0">
                            <h3>Manfaat SEPUH</h3>
                            <ul style={{ textAlign: 'justify' }}>
                                <li><strong>Efisiensi Administrasi:</strong> Mengurangi beban administratif dengan otomatisasi proses penjadwalan dan manajemen informasi.</li>
                                <li><strong>Peningkatan Pelayanan Pasien:</strong> Memastikan pasien mendapatkan layanan tepat waktu dan mengurangi waktu tunggu.</li>
                                <li><strong>Manajemen Data Terpusat:</strong> Semua data pasien, dokter, dan jadwal terintegrasi dalam satu sistem, memudahkan akses dan pengelolaan informasi.</li>
                                <li><strong>Komunikasi yang Lebih Baik:</strong> Memfasilitasi komunikasi yang lebih efektif antara pasien, dokter, dan staf rumah sakit.</li>
                                <li><strong>Pengingat Otomatis:</strong> Mengirimkan pengingat otomatis kepada pasien mengenai jadwal periksa, sehingga mengurangi kemungkinan ketidakhadiran.</li>
                            </ul>
                        </div>
                        <div className="col-md-6 text-start pt-5 pt-md-0">
                            <h3>Visi</h3>
                            <p style={{ textAlign: 'justify' }}>"Menjadi sistem penjadwalan terdepan yang membantu rumah sakit dalam memberikan pelayanan kesehatan yang efisien dan berkualitas tinggi untuk semua pasien."</p>
                        </div>
                        <div className="col-md-6 text-start pt-5 pt-md-0">
                            <h3>Misi</h3>
                            <ul style={{ textAlign: 'justify' }}>
                                <li>Menyediakan solusi teknologi yang inovatif untuk memudahkan penjadwalan dan manajemen informasi di rumah sakit.</li>
                                <li>Meningkatkan efisiensi operasional rumah sakit melalui otomatisasi dan integrasi sistem informasi.</li>
                                <li>Memastikan akses yang mudah dan cepat terhadap informasi pasien dan dokter untuk meningkatkan kualitas pelayanan kesehatan.</li>
                                <li>Mendukung kolaborasi yang lebih baik antara pasien, dokter, dan staf rumah sakit dengan menyediakan platform komunikasi yang efektif.</li>
                                <li>Berkomitmen pada keamanan dan privasi data dengan menerapkan standar tinggi dalam pengelolaan dan perlindungan informasi.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-dark text-white pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Kontak Kami</h5>
                            <p>Email: info@sepuh.com</p>
                            <p>Telepon: +62 821 259 858 28</p>
                        </div>
                        <div className="col-md-4">
                            <h5>Tautan Cepat</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Home</a></li>
                                <li><a href="#" className="text-white">Tentang</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Ikuti Kami</h5>
                            <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className="text-center py-3">
                        &copy; 2024 SEPUH. All rights reserved.
                    </div>
                </div>
            </footer>
        </Fragment>
    );
};

export default Home;
