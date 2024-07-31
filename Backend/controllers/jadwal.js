const mongoose = require("mongoose");
const jadwalSchema = require("../models/jadwal");
const dokterSchema = require("../models/dokter");
const pasienSchema = require("../models/pasien");
const userSchema = require("../models/user");
const response = require("../response/response_valid");

module.exports = {
    get: async (req, res) => {
        try {
            const jadwal = await jadwalSchema.find()
                .populate('dokter', 'nama spesialisasi')
                .populate('pasien', 'nama username');
            return response(200, jadwal, 'Menampilkan semua Jadwal', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'internal server error \n gagal menampilkan Jadwal', res);
        }
    },

    getOne: async (req, res) => {
        const id = req.params._id;
        try {
            const content = await jadwalSchema.findById(id)
                .populate('dokter', 'nama spesialisasi')
                .populate('pasien', 'nama username');
            if (!content) {
                return response(404, null, 'Jadwal Tidak Ditemukan', res);
            }
            return response(200, content, 'Menampilkan Jadwal', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error \n gagal menampilkan Jadwal', res);
        }
    },

    post: async (req, res) => {
        try {
            const { waktu, dokter, pasien, ruang } = req.body;
            const searchDokter = await dokterSchema.findOne({ nama: dokter })
            const searchPasien = await userSchema.findOne({ nama: pasien })
            if (searchDokter === null || searchPasien === null) {
                return response(400, null, 'Dokter atau Pasien tidak ditemukan', res);
            }
            const newJadwal = new jadwalSchema({
                waktu,
                dokter: searchDokter._id,
                pasien: searchPasien._id,
                ruang,
                status : 'diajukan'
            });

            await newJadwal.save();
            return response(200, newJadwal, 'Jadwal Berhasil Ditambahkan', res);
        } catch (error) {
            console.error('Database save error:', error.message);
            return response(500, error, 'Internal server error', res);
        }
    },

    put: async (req, res) => {
        const id = req.params._id;
        try {
            const { waktu, dokter, pasien, ruang, status } = req.body;
            const updateSchema = { waktu, dokter, pasien, ruang, status };

            const result = await jadwalSchema.findByIdAndUpdate(id, updateSchema, { new: true });
            return response(200, result, 'Jadwal Berhasil Diupdate', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },


    delete: async (req, res) => {
        const id = req.params._id;
        try {
            const deleteSchema = await jadwalSchema.findByIdAndDelete(id);
            if (!deleteSchema) {
                response(404, null, 'Jadwal tidak ditemukan', res);
                return;
            }
            response(200, deleteSchema, 'Jadwal berhasil dihapus', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    }
};
