const mongoose = require("mongoose");
const obatModel = require("../models/obat");
const response = require("../response/response_valid");

module.exports = {
    get: async (req, res) => {
        try {
            const content = await obatModel.find();

            return response(200, content, 'Menampilkan Semua Obat', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'Internal server error \n Gagal menampilkan Obat', res);
        }
    },

    getFilter: async (req, res) => {
        try {
            const { nama, page = 1, limit = 10 } = req.query;

            let filter = {};

            if (nama) {
                filter.nama = { $regex: nama, $options: 'i' };
            }

            const skip = (page - 1) * limit;
            const content = await obatModel.find(filter).skip(skip).limit(parseInt(limit));
            const totalItems = await obatModel.countDocuments(filter);
            return response(200, { data: content, totalItems, currentPage: page, totalPages: Math.ceil(totalItems / limit) }, 'Menampilkan Semua Obat', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'Internal server error \n Gagal menampilkan Obat', res);
        }
    },


    getOne: async (req, res) => {
        const id = req.params._id;
        try {
            const content = await obatModel.findById(id);

            if (!content) {
                return response(404, null, 'Obat Tidak Ditemukan', res);
            }
            return response(200, content, 'Menampilkan Obat', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error \n gagal menampilkan Obat', res);
        }
    },

    post: async (req, res) => {
        try {
            const { nama, stok, harga } = req.body;
            obatExists = await obatModel.findOne({ nama: nama})
            if(obatExists){
                return response(400, null, 'Nama obat sudah terdaftar', res);
            };

            const newObat = new obatModel({
                nama, 
                stok,
                harga
            });

            await newObat.save();
            return response(200, newObat, 'Obat Berhasil Ditambahkan', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },

    put: async (req, res) => {
        const id = req.params._id;
        try {
            const { nama, stok, harga } = req.body;
            let dataUpdates = { nama, stok, harga };
            if(nama){
                dataObat = await obatModel.findById(id)
                obatExists = await obatModel.findOne({ nama: nama})

                if(obatExists && obatExists.nama != dataObat.nama) {
                    return response(400, null, 'Nama obat sudah terdaftar', res);
                };
            }
            const result = await obatModel.findByIdAndUpdate(id, dataUpdates, { new: true });
            return response(200, result, 'Obat Berhasil Diupdate', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },


    delete: async (req, res) => {
        const id = req.params._id;
        try {
            const deleteSchema = await obatModel.findByIdAndDelete(id);
            if (!deleteSchema) {
                response(404, null, 'Obat tidak ditemukan', res);
                return;
            }
            response(200, deleteSchema, 'Obat berhasil dihapus', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    }
};
