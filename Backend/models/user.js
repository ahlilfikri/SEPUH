const mongoose = require('mongoose');
const { Schema } = mongoose;

const options = { 
  discriminatorKey: 'role', 
  timestamps: true 
};

const userSchema = new Schema({
    nama: { type: String, required: false },
    usia: { type: String, required: false },
    alamat: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, default: null },
    role: { type: Number, required: true, default: 0 } // 0 pasien, 1 apoteker, 2 dokter, 3 admin
}, options);

const User = mongoose.model('user', userSchema);

module.exports = User;

