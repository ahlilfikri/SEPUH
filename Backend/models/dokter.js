const mongoose = require('mongoose');
const { Schema } = mongoose;

const dokterSchema = new Schema({
    spesialisasi: { type: String, required: true },
    jadwal: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })

const dokter = mongoose.model('dokter', dokterSchema);

module.exports = dokter;
