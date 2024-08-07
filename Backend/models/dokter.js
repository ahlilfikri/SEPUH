const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');

const dokterSchema = new Schema({
  spesialisasi: { type: String, required: true },
  jadwal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jadwalDokter' }],
  img: { type: String, required: false },
}, { _id: false });

const Dokter = User.discriminator(2, dokterSchema);

module.exports = Dokter;
