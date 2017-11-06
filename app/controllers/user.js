const bcrypt = require('bcryptjs');
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


    app.post('/login', function(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/tasks',
            failureRedirect: '/user/login',
            failureFlash: true
        })(req, res, next);
    });

    app.post('/register', function(req, res) {
        let errors = [];
        if (!req.body.name) {
            errors.push({ text: 'Enter Name' });
        }
        if (!req.body.email) {
            errors.push({ text: 'Enter email' });
        }
        if (!req.body.password) {
            errors.push({ text: 'Enter password' });
        }
        if (req.body.password && req.body.password != req.body.cpassword) {
            errors.push({ text: 'Enter password and confirm password same' });
        }

        Users.findOne({ email: req.body.email }).then(user => {
            if (user) {
                console.log(user);
                errors.push({ text: 'User with email already exists' });
            }
            if (errors.length > 0) {
                res.render('users/register', {
                    title: 'Register',
                    errors: errors,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    cpassword: req.body.cpassword,
                });
            } else {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                };
                var salt = bcrypt.genSaltSync(10);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        new Users(newUser)
                            .save()
                            .then(user => {
                                req.flash('success_msg', 'Registered Successfully');
                                res.redirect('/user/login');
                            });
                    });
                });
            }

        });
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