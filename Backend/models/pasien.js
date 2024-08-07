const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');

const pasienSchema = new Schema({
    riwayat: { type: [String], required: true },
}, { _id: false });

const Pasien = User.discriminator(0, pasienSchema);

module.exports = Pasien;
