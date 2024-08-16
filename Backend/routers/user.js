const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {authenticateUser, authenticateAdmin, authenticateApoteker, authenticateDokter, authenticatePasien } = require('../middleware/authentication');

//user general
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/login/dokter', userController.loginDokter);
router.post('/login/pasien', userController.loginPasien);
router.post('/logout/:token', userController.logout);
router.put('/reset/:id', userController.reset);

router.get('/all',authenticateAdmin, userController.getAllUser);
router.get('/all/:id',authenticateUser, userController.getOne);
router.post('/all', authenticateAdmin, userController.post);
router.put('/all/:id', authenticateUser, userController.put);
router.delete('/all/:id', authenticateAdmin, userController.delete);

//pasien
router.get('/pasien',authenticateAdmin, userController.getPasien);
router.get('/pasien/filter',authenticateAdmin, userController.getPasienFilter);

//dokter
router.get('/dokter',authenticateUser, userController.getDokter);
router.get('/dokter/filter',authenticateUser, userController.getDokterFilter);

//apoteker
router.get('/apoteker',authenticateApoteker, userController.getApoteker);
router.get('/apoteker/filter',authenticateApoteker, userController.getApotekerFilter);

module.exports = router;

