import React, { Fragment, useState } from 'react';
import './index.css'; // Make sure to import your stylesheet

const Jadwal = () => {
    const [clickedMenu, setClickedMenu] = useState(false);

    const handleClickMenu = () => {
        setClickedMenu(!clickedMenu);
    };

    return (
        <Fragment>
            <div className="container-fluid p-0">
                <h1 onClick={handleClickMenu}>MENU</h1>
                <div className="row p-0 m-0">
                    <div className={`sidebar p-0 m-0 ${clickedMenu ? 'open' : ''}`}>
                        <h1 className='bg-dark'>Sidebar</h1>
                    </div>
                    <div className={`content p-0 m-0 ${clickedMenu ? 'shrink' : ''}`}>
                        <h1 className='bg-warning'>Content</h1>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Jadwal;
