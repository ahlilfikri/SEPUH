const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');

const apotekerSchema = new Schema({
}, { _id: false });

const Apoteker = User.discriminator(1, apotekerSchema);

module.exports = Apoteker;
