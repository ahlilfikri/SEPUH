const mongoose = require('mongoose');
const { Schema } = mongoose;
const cron = require('node-cron');
const Dokter = require('./dokter');

const jadwalDokterSchema = new Schema({
  hari: { type: String, required: true },
  jamMulai: { type: String, required: true },
  jamSelesai: { type: String, required: true },
  kuota: { type: Number, required: true, default: 50 },
}, { timestamps: true });

const jadwalDokter = mongoose.model('jadwalDokter', jadwalDokterSchema);

module.exports = jadwalDokter;

const dayMapping = {
  'senin': 1,
  'selasa': 2,
  'rabu': 3,
  'kamis': 4,
  'jumat': 5,
  'sabtu': 6,
  'minggu': 0
};

cron.schedule('0 0 * * *', async () => {
  try {
    const dokters = await Dokter.find().populate('jadwal');
    const today = new Date().getDay();

    for (const dokter of dokters) {
      for (const jadwal of dokter.jadwal) {
        if (dayMapping[jadwal.hari.toLowerCase()] === today) {
          jadwal.kuota = 50;
          await jadwal.save();
        }
      }
    }
    console.log('Kuota has been reset for all doctors as per their schedule');
  } catch (error) {
    console.error('Error resetting kuota:', error);
  }
});

