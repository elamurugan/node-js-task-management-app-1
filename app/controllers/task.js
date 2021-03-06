var ensureAuthenticated = require('../../app/helpers/helpers').ensureAuthenticated;
module.exports = (app, express, config) => {

    app.get('/task', ensureAuthenticated, (req, res) => {
        res.render('frontend/tasks/list', {
            title: 'Tasks'
        });
    });

    app.get('/task/create', ensureAuthenticated, (req, res) => {
        res.render('frontend/tasks/form', {
            title: 'Create New Task'
        });
    });

    app.get('/task/edit', ensureAuthenticated, (req, res) => {
        res.render('frontend/tasks/form', {
            title: 'Edit Task'
        });
    });


};