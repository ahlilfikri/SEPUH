const mongoose = require("mongoose");
const jadwalSchema = require("../models/jadwal");
const dokterSchema = require("../models/dokter");
const pasienSchema = require("../models/pasien");
const userSchema = require("../models/user");
const response = require("../response/response_valid");

module.exports = {
    get: async (req, res) => {
        try {
            const content = await jadwalSchema.findById(id)
                .populate('dokter', 'nama spesialisasi')
                .populate('pasien', 'nama username');

            return response(200, content, 'Menampilkan Semua Jadwal', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'Internal server error \n Gagal menampilkan Jadwal', res);
        }
    },
    
    getFilter: async (req, res) => {
        try {
            const { pasien, dokter, status, page = 1, limit = 20 } = req.query;
            const skip = (page - 1) * limit;
            
            const limitValue = parseInt(limit);
    
            const pipeline = [
                {
                    $lookup: {
                        from: 'dokters',
                        localField: 'dokter',
                        foreignField: '_id',
                        as: 'dokterInfo'
                    }
                },
                {
                    $lookup: {
                        from: 'users', 
                        localField: 'pasien',
                        foreignField: '_id',
                        as: 'pasienInfo'
                    }
                },
                { $unwind: '$dokterInfo' },
                { $unwind: '$pasienInfo' },
            ];
    
            const matchCriteria = {};
    
            if (pasien) {
                matchCriteria['pasienInfo.nama'] = { $regex: new RegExp(pasien, 'i') }; 
            }
            if (dokter) {
                matchCriteria['dokterInfo.nama'] = { $regex: new RegExp(dokter, 'i') }; 
            }
            if (status) {
                matchCriteria.status = {$regex: status, $options: 'i'}; 
            }
    
            if (Object.keys(matchCriteria).length > 0) {
                pipeline.push({ $match: matchCriteria });
            }
    
            pipeline.push(
                { $skip: skip },
                { $limit: limitValue }
            );
    
            // Add projection stage
            pipeline.push({
                $project: {
                    'dokter.nama': '$dokterInfo.nama',
                    'dokter.spesialisasi': '$dokterInfo.spesialisasi',
                    'pasien.nama': '$pasienInfo.nama',
                    'pasien.username': '$pasienInfo.username',
                    'status': 1,
                    'waktu': 1,
                    'ruang': 1,
                    'createdAt': 1,
                    'updatedAt': 1
                }
            });
    
            // Execute the aggregation
            const content = await jadwalSchema.aggregate(pipeline);
    
            // Count total items matching the criteria
            const totalItems = await jadwalSchema.countDocuments(matchCriteria);
    
            return response(200, {
                data: content,
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limitValue)
            }, 'Menampilkan Semua Jadwal', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'Internal server error \n Gagal menampilkan Jadwal', res);
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
                status: 'diajukan'
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
            let dataUpdates = { waktu, ruang, status };
    
            const resultDokter = await dokterSchema.findOne({ nama: dokter });
            if (resultDokter && dokter) {
                dataUpdates['dokter'] = resultDokter;
            }
    
            const resultPasien = await userSchema.findOne({ nama: pasien });
            if (resultPasien && pasien) {
                dataUpdates['pasien'] = resultPasien;
            }
    
            const result = await jadwalSchema.findByIdAndUpdate(id, dataUpdates, { new: true });
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
