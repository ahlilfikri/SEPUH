const mongoose = require('mongoose');
const { Schema } = mongoose;

const jadwalSchema = new Schema({
    waktu: { type: mongoose.Schema.Types.ObjectId, ref: "jadwalDokter", required: true },
    dokter: { type: mongoose.Schema.Types.ObjectId, ref: "dokter" },
    pasien: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })

const jadwal = mongoose.model('jadwal', jadwalSchema);

module.exports = jadwal;
