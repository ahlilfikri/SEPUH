const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {authenticateUser, authenticateAdmin} = require('../middleware/authentication');

//pasien
router.get('/',authenticateAdmin, userController.getPasien);
router.get('/filter/',authenticateAdmin, userController.getPasienFilter);
router.put('/:id',authenticateUser, userController.updatePasien);

module.exports = router;
