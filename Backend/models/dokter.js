const mongoose = require('mongoose');
const { Schema } = mongoose;

const jadwalDokterSchema = new Schema({
  hari: { type: String, required: true },
  jamMulai: { type: String, required: true },
  jamSelesai: { type: String, required: true }
}, { _id: false });

const dokterSchema = new Schema({
  nama: { type: String, required: true },
  spesialisasi: { type: String, required: true },
  alamat: { type: String, required: false },
  jadwal: { type: [jadwalDokterSchema], required: false },
  img: { type: String, required: false },
}, { timestamps: true });

const Dokter = mongoose.model('Dokter', dokterSchema);

module.exports = Dokter;
