const mongoose = require('mongoose');
const { Schema } = mongoose;

const dokterSchema = new Schema({
    nama : {type: String, required: true},
    spesialisasi: { type: String, required: true },
    jadwal: { type: [String], required: false },
}, { timestamps: true })

const dokter = mongoose.model('dokter', dokterSchema);

module.exports = dokter;
