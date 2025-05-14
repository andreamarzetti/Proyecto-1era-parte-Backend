const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Register a new user
router.post('/register', usersController.register);

// Login a user and issue a token
router.post('/login', usersController.login);

// Fetch the current user's data using JWT authentication
router.get('/current', passport.authenticate('jwt', { session: false }), usersController.getCurrent);

module.exports = router;