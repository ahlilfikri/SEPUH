const mongoose = require("mongoose");
const userModel = require("../models/user");
const dokterSchema = require("../models/dokter");
const apotekerSchema = require("../models/apoteker");
const pasienSchema = require("../models/pasien");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const response = require("../response/response_valid");

module.exports = {
    register: async (req, res) => {
        try {
            const { username, password, email, nama, alamat, usia, role, riwayat } = req.body;

            if (!username || !password || !email) {
                return response(400, null, 'Username, password, and email are required', res);
            }

            const userExist = await userModel.findOne({ $or: [{ email }, { username }] });

            if (userExist) {
                if (userExist.email === email) {
                    return response(400, null, 'Email sudah terdaftar', res);
                }
                if (userExist.username === username) {
                    return response(400, null, 'Username sudah terdaftar', res);
                }
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordEncrypted = await bcrypt.hash(password, salt);

            newUser = new userModel({
                username,
                password: passwordEncrypted,
                email,
                nama,
                alamat,
                usia,
                role,
                riwayat
            });

            result =  await newUser.save();

            dataReturn = resultUser

            return response(201, dataReturn, 'Pasien berhasil didaftarkan', res);
        } catch (error) {
            if (error.code === 11000) {
                return response(400, null, 'Email sudah terdaftar', res);
            }
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },

    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;
            const secret_key = process.env.secret_key;

            const user = await userModel.findOne({ username }).select('-token');
            if (!user) {
                return response(400, null, 'User tidak ditemukan', res);
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return response(400, null, 'Password salah', res);
            }

            const token = jwt.sign({ id: user._id, username: user.username, role: user.role, nama: user.nama }, secret_key, { expiresIn: '1d' });
            user.token = token;
            await user.save();
            return response(200, token, 'Login berhasil', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    },
    logout: async (req, res) => {
        try {
            const token = req.params.token;
            const user = await userModel.findOne({ token });
            if (!user) {
                return res.status(400).json({ message: 'User tidak ditemukan' });
            }
            user.token = null;
            user.save();
            return res.status(200).json({ message: 'Logout berhasil' });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAllUser: async (req, res) => {
        try {
            const user = await userModel.find();
            return response(200, user, 'Menampilkan semua user', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    getOne: async (req, res) => {
        id = req.params.id;
        try {
            const user = await userModel.findById(id);
            if (!user) {
                return response(404, null, 'User tidak ditemukan', res)
            }
            return response(200, user, 'Menampilkan semua user', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    post: async (req, res) => {
        const { nama, usia, alamat, username, password, email, role, spesialisasi, riwayat } = req.body;
        try {
            const userExist = await userModel.findOne({ $or: [{ email }, { username }] });

            if (userExist) {
                if (userExist.email === email) {
                    return response(400, null, 'Email sudah terdaftar', res);
                }
                if (userExist.username === username) {
                    return response(400, null, 'Username sudah terdaftar', res);
                }
            }
            const passwordEncripted = await bcrypt.hash(password, 15);
            let newUser
            if (role === 3) {
                newUser = new userModel({
                    nama,
                    usia,
                    alamat,
                    username,
                    password: passwordEncripted,
                    email,
                    role: 3
                });
                await newUser.save();
            } else if (role === 2) {
                newUser = new dokterSchema({
                    nama,
                    usia,
                    alamat,
                    username,
                    password: passwordEncripted,
                    email,
                    role: 2,
                    spesialisasi
                });
                await newUser.save();
            } else if (role === 1) {
                newUser = new apotekerSchema({
                    nama,
                    usia,
                    alamat,
                    username,
                    password: passwordEncripted,
                    email,
                    role: 1
                });
                await newUser.save();
            } else {
                newUser = new pasienSchema({
                    nama,
                    usia,
                    alamat,
                    username,
                    password: passwordEncripted,
                    email,
                    riwayat,
                    role: 0
                });
                await newUser.save();
            }
            return response(201, newUser, 'User berhasil di daftarkan', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    put: async (req, res) => {
        id = req.params.id;
        const updatedData = req.body;
        
        try {
            let result;
            resultUser = await userModel.findById(id);
            
            if(resultUser.role === 3){
                result = await userModel.findByIdAndUpdate(id, updatedData, { new: true });
            } else if (resultUser.role === 2){
                result = await dokterSchema.findByIdAndUpdate(id, updatedData, { new: true });
            } else if (resultUser.role === 1){
                result = await apotekerSchema.findByIdAndUpdate(id, updatedData, { new: true });
            }else {
                result = await pasienSchema.findByIdAndUpdate(id, updatedData, { new: true });
            }
            return response(200, result, 'User berhasil di update', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            const result = await userModel.findByIdAndDelete(id);

            return response(200, result, 'User berhasil dihapus', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res);
        }
    },
    reset: async (req, res) => {
        id = req.params.id;
        try {
            const user = await userModel.findById({ _id: id });

            if (!user) {
                return response(404, null, 'User tidak ditemukan', res);
            }

            const { newPassword, oldPassword } = req.body;
            const validPassword = await bcrypt.compare(oldPassword, user.password);
            if (!validPassword) {
                return response(400, null, 'Password salah', res);
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordEncrypted = await bcrypt.hash(newPassword, salt);

            const updatedData = {
                password: passwordEncrypted
            };

            const result = await userModel.findByIdAndUpdate(id, updatedData, { new: true });
            return response(200, result, 'Password berhasil direset', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res);
        }
    },
    getPasien: async (req, res) => {
        try {
            const content = await pasienSchema.find({});

            return response(200, content, 'Menampilkan Semua Pasien', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    getPasienFilter: async (req, res) => {
        const { nama, usia, alamat, page = 1, limit = 20 } = req.query;

        let filter = {};

        if (nama) {
            filter.nama = { $regex: nama, $options: 'i' };
        }
        if (usia) {
            filter.usia = { $regex: usia, $options: 'i' };
        }
        if (alamat) {
            filter.alamat = { $regex: alamat, $options: 'i' };
        }

        const skip = (page - 1) * limit;
        const content = await pasienSchema.find(filter).skip(skip).limit(parseInt(limit));
        const totalItems = await pasienSchema.countDocuments(filter);
        return response(200, { data: content, totalItems, currentPage: page, totalPages: Math.ceil(totalItems / limit) }, 'Menampilkan Semua Pasien', res);
    },
    getDokter: async (req, res) => {
        try {
            const content = await dokterSchema.find();
            return response(200, content, 'Menampilkan Semua Dokter', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    getDokterFilter: async (req, res) => {
        const { nama, spesialisasi, alamat, page = 1, limit = 20 } = req.query;

        let filter = {};

        if (nama) {
            filter.nama = { $regex: nama, $options: 'i' };
        }
        if (spesialisasi) {
            filter.spesialisasi = { $regex: spesialisasi, $options: 'i' };
        }
        if (alamat) {
            filter.alamat = { $regex: alamat, $options: 'i' };
        }

        const skip = (page - 1) * limit;
        const content = await dokterSchema.find(filter).skip(skip).limit(parseInt(limit));
        const totalItems = await dokterSchema.countDocuments(filter);
        return response(200, { data: content, totalItems, currentPage: page, totalPages: Math.ceil(totalItems / limit) }, 'Menampilkan Semua Dokter', res);
    },
    getApoteker: async (req, res) => {
        try {
            const content = await apotekerSchema.find();
            return response(200, content, 'Menampilkan Semua Pasien', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    getApotekerFilter: async (req, res) => {
        const { nama, usia, alamat, page = 1, limit = 20 } = req.query;

            let filter = {};

            if (nama) {
                filter.nama = { $regex: nama, $options: 'i' };
            }
            if (usia) {
                filter.usia = { $regex: usia, $options: 'i' };
            }
            if (alamat) {
                filter.alamat = { $regex: alamat, $options: 'i' }; 
            }

            const skip = (page - 1) * limit;
            const content = await apotekerSchema.find(filter).skip(skip).limit(parseInt(limit));
            const totalItems = await apotekerSchema.countDocuments(filter);
            return response(200, { data: content, totalItems, currentPage: page, totalPages: Math.ceil(totalItems / limit) }, 'Menampilkan Semua Apoteker', res);
    },
}
