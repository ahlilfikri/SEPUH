const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    nama: { type: String, required: false },
    usia: { type: String, required: false },
    alamat: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, default: null },
    role: { type: String, required: true, default: 0 }, // 0 pasien, 1 dokter, 2 admin
}, { timestamps: true })

const user = mongoose.model('user', userSchema);

module.exports = user;
