const express = require('express');
const router = express.Router();
const authVerify = require('../middleware/authVerify');
const { add, getAll } = require('../controllers/favoritesCtrl')

router.post('/', authVerify, add);
router.get('/', authVerify,  getAll);


module.exports = router;