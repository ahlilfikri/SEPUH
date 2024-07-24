const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {authenticateUser, authenticateAdmin} = require('../middleware/authentication');

//user
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout/:token', userController.logout);
router.get('/',authenticateAdmin, userController.getAllUser);
router.post('/', authenticateAdmin, userController.post);
router.put('/:id', authenticateAdmin, userController.put);
router.delete('/:id', authenticateAdmin, userController.delete);

//dokter
router.get('/dokter',authenticateAdmin, userController.getDokter);

//pasien
router.get('/pasien',authenticateAdmin, userController.getPasien);

module.exports = router;
