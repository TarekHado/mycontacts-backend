const express = require('express');
const router = express.Router();
const { register, login, current } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', register).post('/login', login);
router.get('/current', auth, current);

module.exports = router;
