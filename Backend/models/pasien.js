const mongoose = require('mongoose');
const { Schema } = mongoose;

const pasienSchema = new Schema({
    nama: { type: String, required: true },
    usia: { type: String, required: true },
    alamat: { type: String, required: true },
    riwayat: { type: [String], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })

const pasien = mongoose.model('pasien', pasienSchema);

module.exports = pasien;
