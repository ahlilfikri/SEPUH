const mongoose = require("mongoose");
const dokterSchema = require("../models/dokter");
const response = require("../response/response_valid");

module.exports = {
    get: async (req, res) => {
        try {
            const content = await dokterSchema.find();
            return response(200, content, 'Menampilkan Semua Dokter', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'internal server error \n gagal menampilkan Dokter', res);
        }
    },

    getOne: async (req, res) => {
        const id = req.params._id;
        try {
            const content = await dokterSchema.findById(id);
            if (!content) {
                return response(404, null, 'Dokter Tidak Ditemukan', res);
            }
            return response(200, content, 'Menampilkan Dokter', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error \n gagal menampilkan Dokter', res);
        }
    },

    post: async (req, res) => {
        try {
            const { nama, spesialisasi, alamat, jadwal, img } = req.body;

            const newDokter = new dokterSchema({
                nama,
                spesialisasi,
                alamat,
                jadwal, 
                img
            });

            await newDokter.save();
            return response(200, newDokter, 'Dokter Berhasil Ditambahkan', res);
        } catch (error) {
            console.error('Database save error:', error.message);
            return response(500, error, 'Internal server error', res);
        }
    },

    put: async (req, res) => {
        const id = req.params._id;
        try {
            const { nama, spesialisasi, alamat, jadwal, img } = req.body;
            const updateDokter = {
                nama,
                spesialisasi,
                alamat,
                jadwal, 
                img
            };

            const result = await dokterSchema.findByIdAndUpdate(id, updateDokter, { new: true });
            if (!result) {
                return response(404, null, 'Dokter tidak ditemukan', res);
            }
            return response(200, result, 'Dokter Berhasil Diupdate', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },

    delete: async (req, res) => {
        const id = req.params._id;
        try {
            const deleteDokter = await dokterSchema.findByIdAndDelete(id);
            if (!deleteDokter) {
                response(404, null, 'Dokter tidak ditemukan', res);
                return;
            }
            response(200, deleteDokter, 'Dokter berhasil dihapus', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    }
};
