
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/jadwal');
const {authenticateUser, authenticateAdmin, authenticateApoteker, authenticateDokter, authenticatePasien } = require('../middleware/authentication');

router.get('/', authenticateUser, Controller.get);
router.get('/filter/', authenticateUser, Controller.getFilter);
router.get('/:_id', authenticateUser, Controller.getOne);
router.post('/', authenticateUser,Controller.post);
router.put('/:_id', authenticateUser, Controller.put);
router.delete('/:_id', authenticateUser, Controller.delete);

router.put('/:_id', authenticateUser, Controller.finish);
router.get('/dokter/jadwaldokter', authenticateUser, Controller.jadwalDokter);
router.get('/antrian/filter', authenticateUser, Controller.antrian);

module.exports = router;
