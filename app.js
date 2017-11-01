/*
 *
 */

const config = require('./app/config/config');
const PATH = require('path');
const FS = require('fs');
const URL = require('url');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const BasePath = PATH.join(__dirname, '/app/');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(config.mongoURI, {
    useMongoClient: true
  })
  .then(() => console.log('DB ' + config.mongoURI + ' Connected'))
  .catch(err => console.log(err));

const app = express();
var helpers = require('./app/helpers/helpers');
require('./app/models/User');
require('./app/models/Tasks');
require('./app/helpers/passport');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.engine('handlebars', exphbs({
  extname: 'handlebars',
  defaultLayout: 'app',
  layoutsDir: BasePath + 'views/layouts',
  partialsDir: BasePath + 'views/partials'
}));
app.set('view engine', 'handlebars');
app.use(express.static(PATH.join(__dirname, '/public')));
app.set('views', BasePath + 'views');

app.use(
  cookieSession({
    maxAge: config.cookieExpireTime,
    keys: [config.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || config.defaultPort;
app.locals.copyright = new Date().getFullYear();
app.locals.appName = config.appName;
app.locals.logo = config.appName.match(/\b(\w)/g).join('');
app.locals.baseUrl = config.appUrl + ':' + PORT;

// require('./app/helpers/auth')(app);

app.use(function routing(req, res, next) {
  var reqModule = URL.parse(req.url).pathname.split('/')[1];
  if (!reqModule) {
    reqModule = 'home';
  }
  if (reqModule && config.modulesList.indexOf(reqModule) >= 0) {
    var modPath = BasePath + 'controllers/' + reqModule + '.js ';
    console.log(modPath);
    if (FS.existsSync(modPath)) {
      var module = require(modPath)(app, express);
    }
  }
  next();
});

app.listen(PORT);
console.log("Application Running in ", config.appUrl + ':' + PORT);
