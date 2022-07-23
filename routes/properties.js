const express = require('express');
const router = express.Router();
const { getAll, getDetail, create, deleteProperty } = require('../controllers/propertiesCtrl')

router.get('/', getAll);
router.get('/:id', getDetail);
router.post('/', create);
router.delete('/:id', deleteProperty);

module.exports = router;