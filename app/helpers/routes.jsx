const passport = require('passport');

module.exports = (app, express, config) => {

    /*
      // Authentication middleware
      var checkUserIsAdmin = function(req, res, next) {
        if (req.session && req.session._admin !== true) {
          return next(401);
        }
        return next();
      };

      // Admin route that fetches users and calls render function
      var admin = {
        main: function(req, res, next) {
          req.db.get('users').find({}, function(e, users) {
            if (e) return next(e);
            if (!users) return next(new Error('No users to display.'));
            res.render('admin/index.html', users);
          });
        }
      };

      // Display list of users for admin dashboard
      app.get('/admin', checkUserIsAdmin, admin.main);
      */

    app.get('/api', (req, res) => {
        res.send({
            msg: 'Tasks Management Application in Node.js',
            code: 200
        });
    });

    app.get('/api/profile', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.send({
                msg: 'Login Please',
                code: 403
            });
        }
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send({
            msg: 'Logged Out Successfully',
            code: 200
        });
    });

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/', function(req, res) {
        if (req.user) {
            res.writeHead(302, {
                'Location': app.locals.baseUrl + '/tasks'
            });
            res.end();
        } else {
            res.render('home', {
                title: 'Home',
                layout: 'layout'
            });
        }
    });

    app.post('/login', function(req, res) {

    });

    app.post('/register', function(req, res) {

    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.writeHead(302, {
            'Location': app.locals.baseUrl
        });
        res.end();
    });

    app.get('/tasks', function(req, res) {
        res.render('tasks/list_tasks', {
            title: 'Tasks'
        });
    });

    app.get('/tasks/add', function(req, res) {
        res.render('tasks/add_task', {
            title: 'Add New Task'
        });
    });

    app.get('/tasks/edit', function(req, res) {
        res.render('tasks/edit_task', {
            title: 'Edit Task',
            task: {}
        });
    });

    app.post('/tasks/update', function(req, res) {

    });

    app.get('/tasks/delete', function(req, res) {

    });

};