const helpers = require('../../app/helpers/helpers');
var ensureAuthenticated = helpers.ensureAuthenticated;
module.exports = (app, express, config) => {
    app.set('views', app.get('_VIEWS_PATH') + '/frontend');

    app.use(function(req, res, next) {
        if (!req.user) {
            res.writeHead(302, {
                'Location': helpers.baseUrl() + '/user/login'
            });
            res.end();
        }
        next();
    });

    app.get('/task', ensureAuthenticated, (req, res) => {
        res.render('tasks/list', {
            title: 'Tasks'
        });
    });

    app.get('/task/create', ensureAuthenticated, (req, res) => {
        res.render('tasks/form', {
            title: 'Create New Task',
            task: []
        });
    });

    app.get('/task/edit', ensureAuthenticated, (req, res) => {
        res.render('tasks/form', {
            title: 'Edit Task',
            task: []
        });
    });

    app.post('/task/create', ensureAuthenticated, (req, res) => {
        var formData = req.body;

        res.render('tasks/form', {
            title: 'Create New Task',
            task: formData
        });

    });
};