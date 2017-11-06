const config = require('../config/config');
const PORT = process.env.PORT || config.defaultPort;

exports.baseUrl = function() {
    return config.appUrl + ':' + PORT;
};

exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');
}