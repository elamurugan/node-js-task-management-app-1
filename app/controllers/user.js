const bcrypt = require('bcryptjs');
const passport = require('passport');
var helpers = require('../helpers/helpers');

module.exports = (app, express, config) => {
    app.set('views', app.get('_VIEWS_PATH') + '/frontend');
    app.get('/user/', function(req, res) {
        res.writeHead(302, {
            'Location': helpers.baseUrl() + '/user/login'
        });
        res.end();
    });

    app.get('/user/login', function(req, res) {
        if (req.user) {
            res.render('users/login', {
                title: 'Login'
            });
        } else {
            res.writeHead(302, {
                'Location': helpers.baseUrl() + '/user/login'
            });
            res.end();
        }
    });

    app.get('/user/register', function(req, res) {
        if (req.user) {
            res.render('users/register', {
                title: 'Register'
            });
        } else {
            res.writeHead(302, {
                'Location': helpers.baseUrl() + '/user/login'
            });
            res.end();
        }
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
            res.render('users/profile', {
                title: 'Profile'
            });
        } else {
            res.writeHead(302, {
                'Location': helpers.baseUrl() + '/user/login'
            });
            res.end();
        }
    });

    app.get('/user/tasks', function(req, res) {
        if (req.user) {
            res.render('tasks/list', {
                title: 'Profile'
            });
        } else {
            res.writeHead(302, {
                'Location': helpers.baseUrl() + '/user/login'
            });
            res.end();
        }
    });

    app.get('/user/list', function(req, res) {
        res.send([{ id: 1, name: 'hello 1' }, { id: 2, name: 'hello 2' }, { id: 3, name: 'hello 3' }]);
        res.end();
    });

}