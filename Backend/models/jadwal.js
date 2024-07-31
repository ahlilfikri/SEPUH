const mongoose = require('mongoose');
const { Schema } = mongoose;

const jadwalSchema = new Schema({
    waktu: { type: String, required: true },
    dokter: { type: mongoose.Schema.Types.ObjectId, ref: "dokter" },
    pasien: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    ruang: { type: [String], required: false },
    status: { type: String, required: true, default : 'diajukan' },
}, { timestamps: true })

const jadwal = mongoose.model('jadwal', jadwalSchema);

module.exports = jadwal;
