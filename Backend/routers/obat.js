
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/obat');
const {authenticateUser, authenticateAdmin, authenticateApoteker, authenticateDokter, authenticatePasien } = require('../middleware/authentication');

router.get('/', authenticateUser, Controller.get);
router.get('/filter/', authenticateUser, Controller.getFilter);
router.get('/:_id', authenticateUser, Controller.getOne);
router.post('/', authenticateApoteker,Controller.post);
router.put('/:_id', authenticateApoteker, Controller.put);
router.delete('/:_id', authenticateApoteker, Controller.delete);

module.exports = router;
