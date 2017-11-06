const passport = require('passport');
const config = require('../config/config');
var express = require('express');
var router = express.Router();



router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/google/callback', passport.authenticate('google'));

module.exports = router;
