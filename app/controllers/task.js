const passport = require('passport');

module.exports = app => {

  app.get('/task', (req, res) => {
    res.send({
      welcome: ' environment'
    });
  });

};
