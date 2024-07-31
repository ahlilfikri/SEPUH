const mongoose = require("mongoose");
const userModel = require("../models/user");
const dokterModel = require("../models/dokter");
const pasienModel = require("../models/pasien");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const response = require("../response/response_valid");
const dokter = require("../models/dokter");

module.exports = {
    register: async (req, res) => {
        try {
            const { username, password, email, nama, alamat, usia, role, spesialisasi } = req.body;

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

            const newUser = new userModel({
                username,
                password: passwordEncrypted,
                email,
                nama,
                alamat,
                usia,
                role
            });

            const resultUser = await newUser.save();

            dataReturn = {
                user: resultUser
            }
            if (role === 0) {
                const newPasien = new pasienModel({
                    user: resultUser._id,
                })
                const resultPasien = await newPasien.save();
                dataReturn = {
                    user: resultUser,
                    pasien: resultPasien
                }
            }

            console.log(dataReturn);
            return response(201, dataReturn, 'User berhasil didaftarkan', res);
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

            const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secret_key, { expiresIn: '1d' });
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
            if (!user){
                return response(404, null, 'User tidak ditemukan', res)
            }
            return response(200, user, 'Menampilkan semua user', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    post: async (req, res) => {
        const { username, password, email } = req.body;
        const passwordEncripted = await bcrypt.hash(password, 15);
        const newUser = new userModel({
            username,
            password: passwordEncripted,
            email,
        })
        try {
            await newUser.save();
            return response(201, newUser, 'User berhasil di daftarkan', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    put: async (req, res) => {
        userId = req.params.id;
        const updatedData = req.body;
        try {
            const result = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
            return response(200, result, 'User berhasil di update', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            const searchResult = await userModel.findById(id);
            const resultUser = await userModel.findByIdAndDelete(id);
            var result = {};

            if (searchResult.role === 0) {
                const resultPasien = await pasienModel.findOneAndDelete({ user: id });
                result = {
                    user: resultUser,
                    pasien: resultPasien
                }
            }else {
                result = {
                    user: resultUser
                }
            }

            return response(200, result, 'User berhasil dihapus', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res);
        }
    },
    reset: async(req, res) => {
        id = req.params.id;
        try {
            const user = await userModel.findById({ _id:id });
            console.log(user);

            if(!user){
                return response(404, null, 'User tidak ditemukan', res);
            }

            const {newPassword, oldPassword} = req.body;
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
        }catch(error){
            console.error(error.message);
            return response(500, error, 'internal server error', res);
        }
    },
    getPasien: async (req, res) => {
        try {
            const pasien = await pasienModel.find();
            return response(200, pasien, 'Menampilkan semua pasien', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'internal server error', res)
        }
    },
    updatePasien: async (req, res) => {
        const id = req.params._id;
        try {
            const { riwayat } = req.body;
            const updatePasien = { riwayat};

            const result = await pasienModel.findByIdAndUpdate(id, updatePasien, { new: true });
            return response(200, result, 'Pasien Berhasil Diupdate', res);
        } catch (error) {
            console.error(error.message);
            return response(500, error, 'Internal server error', res);
        }
    }
}
