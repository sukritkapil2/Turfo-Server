const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')

router.post('/register', UserController.register_user)

module.exports = router;