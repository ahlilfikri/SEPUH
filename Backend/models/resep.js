const mongoose = require('mongoose');
const { Schema } = mongoose;

const resepSchema = new Schema({
  pasien: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user',required: true }],
  dokter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user',required: true }],
  obat: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'obat',required: true }],
  rujukan: { type: String, required: false },
  tanggal: { type: Date, required: false },
}, { timestamps: true});

const Resep = mongoose.model('resep', resepSchema);

module.exports = Resep;
