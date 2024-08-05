const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {authenticateUser, authenticateAdmin} = require('../middleware/authentication');

//pasien
router.get('/',authenticateUser, userController.getPasien);
router.get('/:id',authenticateUser, userController.getPasienOne);
router.get('/filter/',authenticateUser, userController.getPasienFilter);
router.put('/:id',authenticateUser, userController.updatePasien);

module.exports = router;
