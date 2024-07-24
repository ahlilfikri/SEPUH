const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authenticateToken = require('../middleware/authentication'); // Assuming you save it in middleware folder

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout/:token', userController.logout);
router.get('/',authenticateToken, userController.getAllUser);
router.post('/', authenticateToken, userController.post);
router.put('/:id', authenticateToken, userController.put);
router.delete('/:id', authenticateToken, userController.delete);

module.exports = router;
