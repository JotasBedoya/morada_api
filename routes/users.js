const express = require('express');
const router = express.Router();
const authVerify = require('../middleware/authVerify');
const { login, signup, getUser } = require('../controllers/usersCtrl')

router.post('/login', login);
router.post('/signup', signup);
router.get('/info', authVerify, getUser);

module.exports = router;