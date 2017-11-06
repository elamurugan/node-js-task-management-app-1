const passport = require('passport');
const config = require('../config/config');

var express = require('express');
var router = express.Router();


app.get('/', (req, res) => {
  res.send({
    msg: 'Tasks Management Application in Node.js',
    code: 200
  });
});

app.get('/profile', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({
      msg: 'Login Please',
      code: 403
    });
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.send({
    msg: 'Logged Out Successfully',
    code: 200
  });
});

module.exports = router;
