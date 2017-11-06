const ENVIRONMENT = process.env.NODE_ENV || 'development';
var config = require('./' + ENVIRONMENT);

config.appName = 'Tasks Management Application';
config.cookieExpireTime = 30 * 24 * 60 * 60 * 1000;
config.cookieKey = 'nm_tm';
config.defaultPort = 5000;

module.exports = config;
