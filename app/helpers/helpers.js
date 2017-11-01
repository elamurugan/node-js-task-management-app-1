const config = require('../config/config');
const PORT = process.env.PORT || config.defaultPort;

exports.baseUrl = function() {
  return config.appUrl + ':' + PORT;
};
