
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/jadwal');
const {authenticateUser, authenticateAdmin} = require('../middleware/authentication');

router.get('/', authenticateUser, Controller.get);
router.get('/filter/', authenticateUser, Controller.getFilter);
router.get('/:_id', authenticateUser, Controller.getOne);
router.post('/', authenticateUser,Controller.post);
router.put('/:_id', authenticateUser, Controller.put);
router.delete('/:_id', authenticateUser, Controller.delete);

module.exports = router;
