const mongoose = require('mongoose');
const { Schema } = mongoose;

const obatSchema = new Schema({
    nama: { type: String, required: true },
    stok: { type: Number, required: true, default: 0 },
    harga: { type: Number, required: true, default: 0 },
}, { timestamps: true })

const obat = mongoose.model('obat', obatSchema);

module.exports = obat;
