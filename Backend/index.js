const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');

require('dotenv').config();

app.use(cors())

app.use('/tmp', express.static('tmp'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// database connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database terhubung');
    }
    ).catch((err) => {
        console.log(err);
    }
    );
// database connection

// routes
const jadwalRouter = require('./routers/jadwal');
// const dokterRouter = require('./routers/dokter');
const userRouter = require('./routers/user');
// const pasienRouter = require('./routers/pasien');
// routes

// use routes
// app.use('/dokter', dokterRouter);
app.use('/jadwal', jadwalRouter);
app.use('/user', userRouter);
// app.use('/pasien', pasienRouter);
// use routes

app.listen(process.env.local_port, () => {
    console.log(`Server running on port http://localhost:${process.env.local_port}`);
});
