
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/dokter');
const {authenticateUser, authenticateAdmin} = require('../middleware/authentication');

router.get('/', authenticateUser, Controller.get);
router.get('/:_id', authenticateUser, Controller.getOne);
router.post('/', authenticateAdmin,Controller.post);
router.put('/:_id', authenticateAdmin, Controller.put);
router.delete('/:_id', authenticateAdmin, Controller.delete);

module.exports = router;
