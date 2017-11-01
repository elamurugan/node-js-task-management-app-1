const passport = require('passport');
const config = require('../config/config');
var helpers = require('../helpers/helpers');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.writeHead(302, {
    'Location': helpers.baseUrl() + '/user/login'
  });
  res.end();
});

router.post('/login', function(req, res) {

});

router.post('/register', function(req, res) {
  console.log(req.query);
  console.log(req.body);
  res.end();
});

router.get('/logout', function(req, res) {
  req.logout();
  res.writeHead(302, {
    'Location': helpers.baseUrl()
  });
  res.end();
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

router.get('/tasks', function(req, res) {
  res.render('tasks/list_tasks', {
    title: 'Tasks'
  });
});

module.exports = router;
