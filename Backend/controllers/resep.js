const mongoose = require("mongoose");
const resepModel = require("../models/resep");
const pasienSchema = require("../models/pasien");
const dokterSchema = require("../models/dokter");
const obatModel = require("../models/obat");
const response = require("../response/response_valid");

module.exports = {
    get: async (req, res) => {
        try {
            const content = await resepModel.find()
                .populate('dokter', 'nama spesialisasi')
                .populate('pasien', 'nama username')
                .populate('obat', 'nama harga stok')

            return response(200, content, 'Menampilkan Semua Resep', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'Internal server error \n Gagal menampilkan Resep', res);
        }
    },

    // getFilter: async (req, res) => {
    //     try {
    //         const { nama, page = 1, limit = 10 } = req.query;

    //         let filter = {};

    //         if (nama) {
    //             filter.nama = { $regex: nama, $options: 'i' };
    //         }

    //         const skip = (page - 1) * limit;
    //         const content = await resepModel.find(filter).skip(skip).limit(parseInt(limit));
    //         const totalItems = await resepModel.countDocuments(filter);
    //         return response(200, { data: content, totalItems, currentPage: page, totalPages: Math.ceil(totalItems / limit) }, 'Menampilkan Semua Resep', res);
    //     } catch (err) {
    //         console.error(err.message);
    //         return response(500, err, 'Internal server error \n Gagal menampilkan Resep', res);
    //     }
    // },


    getOne: async (req, res) => {
        const id = req.params._id;
        try {
            const content = await resepModel.findById(id);

            if (!content) {
                return response(404, null, 'Resep Tidak Ditemukan', res);
            }
            return response(200, content, 'Menampilkan Resep', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error \n gagal menampilkan Resep', res);
        }
    },

    post: async (req, res) => {
        try {
            const { pasien, dokter, tanggal, rujukan, obat } = req.body;

            const newResep = new resepModel({
                pasien,
                dokter,
                tanggal,
                rujukan,
                obat
            });

            await newResep.save();
            return response(200, newResep, 'Resep Berhasil Ditambahkan', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },

    put: async (req, res) => {
        const id = req.params._id;
        try {
            const { pasien, dokter, tanggal, rujukan, obat } = req.body;
            let dataUpdates = { pasien, dokter, tanggal, rujukan, obat };
            if (pasien) {
                const resultPasien = await pasienSchema.findOne({ nama: pasien });
                dataUpdates.pasien = resultPasien._id;
            }
            if (dokter) {
                const resultDokter = await dokterSchema.findOne({ nama: dokter });
                dataUpdates.dokter = resultDokter._id;
            }
            if (obat) {
                const resultObat = await obatSchema.findOne({ nama: nama });
                dataUpdates.obat = resultObat._id;
            }
            const result = await resepModel.findByIdAndUpdate(id, dataUpdates, { new: true });
            return response(200, result, 'Resep Berhasil Diupdate', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },


    delete: async (req, res) => {
        const id = req.params._id;
        try {
            const deleteSchema = await resepModel.findByIdAndDelete(id);
            if (!deleteSchema) {
                response(404, null, 'Resep tidak ditemukan', res);
                return;
            }
            response(200, deleteSchema, 'Resep berhasil dihapus', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    }
};
