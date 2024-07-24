const mongoose = require('mongoose');
const { Schema } = mongoose;

const pasienSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    riwayat: { type: [String], required: true },
}, { timestamps: true })

const pasien = mongoose.model('pasien', pasienSchema);

module.exports = pasien;
