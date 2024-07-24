const mongoose = require('mongoose');
const { Schema } = mongoose;

const jadwalSchema = new Schema({
    waktu: { type: Date, required: true },
    dokter: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    pasien: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    ruang: { type: [String], required: true },
    status: { type: String, required: true },
}, { timestamps: true })

const jadwal = mongoose.model('jadwal', jadwalSchema);

module.exports = jadwal;
