const mongoose = require('mongoose');
const { Schema } = mongoose;

const pasienSchema = new Schema({
    riwayat: { type: [String], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })

const pasien = mongoose.model('pasien', pasienSchema);

module.exports = pasien;
