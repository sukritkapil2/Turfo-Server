const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const UserController = require('../controllers/user')

router.get('/:userId', checkAuth, UserController.get_user);
router.post('/register', UserController.register_user)
router.post('/login', UserController.login_user);

module.exports = router;