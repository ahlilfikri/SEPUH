
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/jadwal');
const authenticateToken = require('../middleware/authentication');

router.get('/', authenticateToken, Controller.get);
router.get('/:_id', authenticateToken, Controller.getOne);
router.post('/', Controller.post);
router.put('/:_id', authenticateToken, Controller.put);
router.delete('/:_id', authenticateToken, Controller.delete);

module.exports = router;
