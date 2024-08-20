
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/resep');
const {authenticateUser, authenticateAdmin, authenticateApoteker, authenticateDokter, authenticatePasien } = require('../middleware/authentication');

router.get('/', authenticateUser, Controller.get);
// router.get('/filter/', authenticateUser, Controller.getFilter);
router.get('/:_id', authenticateUser, Controller.getOne);
router.post('/', authenticateDokter,Controller.post);
router.put('/:_id', authenticateDokter, Controller.put);
router.delete('/:_id', authenticateDokter, Controller.delete);
router.delete('/:_id', authenticateDokter, Controller.delete);

module.exports = router;
