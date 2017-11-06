const passport = require('passport');

module.exports = (app, express, config) => {

    app.get('/task', (req, res) => {
        res.send({
            welcome: ' environment'
        });
    });

    app.get('/task/create', (req, res) => {
        res.send({
            welcome: ' environment'
        });
    });

    app.get('/task/edit', (req, res) => {
        res.send({
            welcome: ' environment'
        });
    });

    app.get('/task/create', (req, res) => {
        res.send({
            welcome: ' environment'
        });
    });

    app.get('/task/create', (req, res) => {
        res.send({
            welcome: ' environment'
        });
    });
};