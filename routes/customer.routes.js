const {__post, __get, __put, __delete, __login, __me } = require('../controllers/customer.controllers');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.post('/login', __login);
router.get('/me', auth, __me);
router.post('/', __post);
router.get('/', __get);
router.get('/:id', __get);
router.put('/:id', __put);
router.delete('/:id', __delete);

module.exports = router;