const passport = require('passport');
const config = require('../config/config');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.user) {
    res.writeHead(302, {
      'Location': app.locals.baseUrl + '/tasks'
    });
    res.end();
  } else {
    res.render('frontend/home', {
      title: 'Home',
      layout: 'layout'
    });
  }
  return;
});

router.get('/:param', function(req, res) {
  res.render('404', {
    url: req.url,
    title: 'Not found',
    layout: 'layout'
  });
});

module.exports = router;
