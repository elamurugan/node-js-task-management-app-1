const passport = require('passport');
const config = require('../config/config');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('tasks/list_tasks', {
    title: 'Tasks'
  });
});

router.get('/add', function(req, res) {
  res.render('tasks/add_task', {
    title: 'Add New Task'
  });
});

router.get('/edit', function(req, res) {
  res.render('tasks/edit_task', {
    title: 'Edit Task',
    task: {}
  });
});

router.post('/update', function(req, res) {

});

router.get('/delete', function(req, res) {

});

module.exports = router;
