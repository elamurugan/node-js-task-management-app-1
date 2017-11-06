const passport = require('passport');
var helpers = require('../helpers/helpers');

module.exports = (app, express, config) => {
    app.get('/user/', function(req, res) {
        res.writeHead(302, {
            'Location': helpers.baseUrl() + '/user/login'
        });
        res.end();
    });

    app.get('/user/login', function(req, res) {
        res.send({
            msg: 'Login Please',
            code: 403
        });
    });

    app.get('/user/register', function(req, res) {
        res.send({
            msg: 'Register Please',
            code: 403
        });
    });

    app.post('/user/login', function(req, res) {

    });

    app.post('/user/register', function(req, res) {
        res.end();
    });

    app.get('/user/logout', function(req, res) {
        req.logout();
        res.writeHead(302, {
            'Location': helpers.baseUrl()
        });
        res.end();
    });

    app.get('/user/profile', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.send({
                msg: 'Login Please',
                code: 403
            });
        }
    });

    app.get('/user/tasks', function(req, res) {
        res.render('tasks/list_tasks', {
            title: 'Tasks'
        });
    });

}