const mongoose = require('mongoose');
const { Schema } = mongoose;

const jadwalSchema = new Schema({
    waktu: { type: Date, required: true },
    dokter: { type: mongoose.Schema.Types.ObjectId, ref: "dokter" },
    pasien: { type: mongoose.Schema.Types.ObjectId, ref: "dokter" },
    ruang: { type: [String], required: true },
}, { timestamps: true })

const jadwal = mongoose.model('jadwal', jadwalSchema);

module.exports = jadwal;
