const mongoose = require("mongoose");
const jadwalSchema = require("../models/jadwal");
const dokterSchema = require("../models/dokter");
const pasienSchema = require("../models/pasien");
const userSchema = require("../models/user");
const response = require("../response/response_valid");

module.exports = {
    get: async (req, res) => {
        try {
            // const { aduan, alamat, status, startDate, endDate, page = 1, limit = 20 } = req.query;

            // let filter = {};

            // if (aduan) {
            //     filter.aduan = { $regex: aduan, $options: 'i' }; // Case insensitive search
            // }
            // if (alamat) {
            //     filter.alamat = alamat;
            // }
            // if (status) {
            //     filter.status = status;
            // }
            // if (startDate || endDate) {
            //     filter.tanggal = {};
            //     if (startDate) {
            //         filter.tanggal.$gte = new Date(startDate);
            //     }
            //     if (endDate) {
            //         filter.tanggal.$lte = new Date(endDate);
            //     }
            // }

            // const skip = (page - 1) * limit;
            // const content = await jadwalSchema.find(filter).skip(skip).limit(parseInt(limit));
            // const content = await jadwalSchema.find().skip(skip).limit(parseInt(limit));
            // const totalItems = await jadwalSchema.countDocuments(filter);

            // return response(200, { data: content, totalItems, currentPage: page, totalPages: Math.ceil(totalItems / limit) }, 'Menampilkan Semua Jadwal', res);
            const jadwal = await jadwalSchema.find();
            return response(200, jadwal, 'Menampilkan semua Jadwal', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'internal server error \n gagal menampilkan Jadwal', res);
        }
    },

    getOne: async (req, res) => {
        const id = req.params._id;
        try {
            const content = await jadwalSchema.findById(id);
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
        try{
            $a == 5;
        }catch(error){
            console.log(error);
        }
        try {
            const { waktu, dokter, pasien, ruang, status } = req.body;
            const searchDokter = await userSchema.findOne({nama:dokter})
            const searchPasien = await userSchema.findOne({nama:pasien})
            if (searchDokter === null || searchPasien === null) {
                return response(400, null, 'Dokter atau Pasien tidak ditemukan', res);
            }
            const newJadwal = new jadwalSchema({
                waktu,
                dokter : searchDokter._id,
                pasien : searchPasien._id,
                ruang,
                status
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
