const mongoose = require('mongoose');
const { Schema } = mongoose;

const jadwalSchema = new Schema({
    waktu: { type: mongoose.Schema.Types.ObjectId, ref: "jadwalDokter", required: true },
    dokter: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    pasien: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    antrian : { type: Number, required: false },
    status : { type: Boolean, required: true, default: false },
}, { timestamps: true })

const jadwal = mongoose.model('jadwal', jadwalSchema);

module.exports = jadwal;
