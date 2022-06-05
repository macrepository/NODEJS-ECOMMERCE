const {__post, __get, __put, __delete } = require('../controllers/customer.controllers');
const express = require('express');
const router = express.Router();

router.post('/', __post);
router.get('/', __get);
router.get('/:id', __get);
router.put('/:id', __put);
router.delete('/:id', __delete);

module.exports = router;