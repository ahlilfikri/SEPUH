const mongoose = require("mongoose");
const jadwalDokterSchema = require("../models/jadwalDokter");
const jadwalSchema = require("../models/jadwal");
const dokterSchema = require("../models/dokter");
const pasienSchema = require("../models/pasien");
const userSchema = require("../models/user");
const response = require("../response/response_valid");

module.exports = {
    get: async (req, res) => {
        try {
            const content = await jadwalSchema.find()
                .populate('dokter', 'nama spesialisasi')
                .populate('pasien', 'nama username')
                .populate('waktu', 'jamMulai jamSelesai hari kuota antrianAktif');

            return response(200, content, 'Menampilkan Semua Jadwal', res);
        } catch (err) {
            console.error(err.message);
            return response(500, err, 'Internal server error \n Gagal menampilkan Jadwal', res);
        }
    },

    getFilter: async (req, res) => {
        try {
            const { pasien, dokter, status, page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;
            const limitValue = parseInt(limit);

            const pipeline = [
                {
                    $lookup: {
                        from: 'users',
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
                {
                    $lookup: {
                        from: 'jadwaldokters',
                        localField: 'waktu',
                        foreignField: '_id',
                        as: 'jadwalInfo'
                    }
                },
                { $unwind: '$dokterInfo' },
                { $unwind: '$pasienInfo' },
                { $unwind: '$jadwalInfo' },
            ];

            const matchCriteria = {};

            if (pasien) {
                matchCriteria['pasienInfo.nama'] = { $regex: new RegExp(pasien, 'i') };
            }
            if (dokter) {
                matchCriteria['dokterInfo.nama'] = { $regex: new RegExp(dokter, 'i') };
            }

            if (status) {
                bbbb = (status === "Active" ? false : true);
                matchCriteria.status = (status === "Active" ? false : true);
            }

            if (Object.keys(matchCriteria).length > 0) {
                pipeline.push({ $match: matchCriteria });
            }

            pipeline.push(
                { $skip: skip },
                { $limit: limitValue }
            );

            // Update projection to match the new structure
            pipeline.push({
                $project: {
                    'dokter.nama': '$dokterInfo.nama',
                    'dokter.spesialisasi': '$dokterInfo.spesialisasi',
                    'pasien.nama': '$pasienInfo.nama',
                    'pasien.username': '$pasienInfo.username',
                    'waktu.hari': '$jadwalInfo.hari',
                    'waktu.jamMulai': '$jadwalInfo.jamMulai',
                    'waktu.jamSelesai': '$jadwalInfo.jamSelesai',
                    'waktu.kuota': '$jadwalInfo.kuota',
                    'waktu.antrianAktif': '$jadwalInfo.antrianAktif',
                    'antrian': 1,
                    'status': 1,
                    'createdAt': 1,
                    'updatedAt': 1
                }
            });

            const content = await jadwalSchema.aggregate(pipeline);
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
                .populate('pasien', 'nama username')
                .populate('jadwal', 'jamMulai jamSelesai hari kuota antrianAktif');

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
            const { waktu, dokter, pasien } = req.body;

            const searchDokter = await dokterSchema.findOne({ nama: dokter });
            const searchPasien = await pasienSchema.findOne({ nama: pasien });
            const searchWaktu = await jadwalDokterSchema.findById(waktu);
            if (searchWaktu.kuota == 0) {
                return response(400, searchWaktu, 'Kuota Sudah Tidak Ada', res);
            }
            if (searchDokter === null || searchPasien === null) {
                return response(400, null, 'Dokter atau Pasien tidak ditemukan', res);
            }
            if (!searchWaktu) {
                return response(400, null, 'Jadwal dokter tidak ditemukan', res);
            }

            const resultAntrian = 51 - searchWaktu.kuota;
            await jadwalDokterSchema.findByIdAndUpdate(
                waktu,
                { kuota: searchWaktu.kuota - 1 },
                { new: true }
            );

            const newJadwal = new jadwalSchema({
                waktu,
                dokter: searchDokter._id,
                pasien: searchPasien._id,
                status: 0,
                antrian: resultAntrian
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
    },

    finish: async (req, res) => {
        const id = req.params._id;
        try {
            const changeAll = await jadwalSchema.updateMany(
                { waktu: id, status: 0 },
                { $set: { status: 1 } }
            );
            response(200, changeAll, 'Status jadwal berhasil diperbarui', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },

    jadwalDokter: async (req, res) => {
        try {
            const { dokter } = req.query;
            
            let filter = {};
    
            if (dokter) {
                filter.nama = { $regex: dokter, $options: 'i' };
            }
            
            const data = await dokterSchema.find(filter)
                .populate('jadwal', 'jamMulai jamSelesai hari kuota antrianAktif');
    
            const jadwal = data.map(item => item.jadwal).flat();
            
            response(200, jadwal, 'Jadwal dokter berhasil ditampilkan', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    }
    
};
