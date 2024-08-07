const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {authenticateUser, authenticateAdmin, authenticateApoteker, authenticateDokter, authenticatePasien } = require('../middleware/authentication');

//user general
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout/:token', userController.logout);
router.put('/reset/:id', userController.reset);

router.get('/all',authenticateAdmin, userController.getAllUser);
router.get('/all/:id',authenticateAdmin, userController.getOne);
router.post('/all', authenticateAdmin, userController.post);
router.put('/all/:id', authenticateAdmin, userController.put);
router.delete('/all/:id', authenticateAdmin, userController.delete);

//pasien
router.get('/pasien',authenticatePasien, userController.getPasien);
router.get('/pasien/filter',authenticatePasien, userController.getPasienFilter);

//dokter
router.get('/dokter',authenticateDokter, userController.getDokter);
router.get('/dokter/filter',authenticateDokter, userController.getDokterFilter);

//apoteker
router.get('/apoteker',authenticateApoteker, userController.getApoteker);
router.get('/apoteker/filter',authenticateApoteker, userController.getApotekerFilter);

module.exports = router;

//authenticate
// register: https://sepuh-api.vercel.app/user/register
// login: https://sepuh-api.vercel.app/user/login
// logout: https://sepuh-api.vercel.app/user/logout
// reset: https://sepuh-api.vercel.app/user/reset

//all user
// getAllUser: https://sepuh-api.vercel.app/user/all
// getOneUser: https://sepuh-api.vercel.app/user/all/:id
// postUser: https://sepuh-api.vercel.app/user/all
// updateUser: https://sepuh-api.vercel.app/user/all/:id
// deleteUser: https://sepuh-api.vercel.app/user/all/:id

//pasien
// getPasien: https://sepuh-api.vercel.app/user/pasien
// getPasienFilter: https://sepuh-api.vercel.app/user/pasien/filter

//dokter
// getDokter: https://sepuh-api.vercel.app/user/dokter/
// getDokterFilter: https://sepuh-api.vercel.app/user/dokter/filter

//apoteker
// getApoteker: https://sepuh-api.vercel.app/user/apoteker
// getApotekerFilter: https://sepuh-api.vercel.app/user/apoteker/filter