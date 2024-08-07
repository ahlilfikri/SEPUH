const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');

const jadwalDokterSchema = new Schema({
  hari: { type: String, required: true },
  jamMulai: { type: String, required: true },
  jamSelesai: { type: String, required: true }
}, { _id: false });

const dokterSchema = new Schema({
  spesialisasi: { type: String, required: true },
  jadwal: { type: [jadwalDokterSchema], required: false },
  img: { type: String, required: false },
}, { _id: false });

const Dokter = User.discriminator(2, dokterSchema);

module.exports = Dokter;
