const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authenticateToken = require('../middleware/authentication'); // Assuming you save it in middleware folder

//user
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout/:token', userController.logout);
router.get('/',authenticateToken, userController.getAllUser);
router.post('/', authenticateToken, userController.post);
router.put('/:id', authenticateToken, userController.put);
router.delete('/:id', authenticateToken, userController.delete);

//dokter
router.get('/dokter',authenticateToken, userController.getDokter);

//pasien
router.get('/pasien',authenticateToken, userController.getPasien);

module.exports = router;
