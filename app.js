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
  layoutsDir: PATH.join(__dirname, '/app/views/layouts'),
  partialsDir: PATH.join(__dirname, '/app/views/partials')
}));
app.set('view engine', 'handlebars');
app.use(express.static(PATH.join(__dirname, '/public')));
app.set('views', PATH.join(__dirname, '/app/views'));

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

app.use(function routing(req, res, next) {
  var reqPath = URL.parse(req.url).pathname.split('/');
  var reqModule = reqPath[1];
  var modPath = PATH.join(__dirname, '/app/controllers/') + reqModule +
    '.js';
  if (FS.existsSync(modPath)) {
    var module = require(modPath);
    app.use('/' + reqModule, module);
  }
  app.use('/', require('./app/controllers/home'));
  next();
});

/*
Traditional way to load routes
*/
//const controllers = require('./app/controllers/routes');
//controllers(app);

/*

var home = require('./app/controllers/home');
app.use('/', home);

var auth = require('./app/controllers/auth');
app.use('/auth', auth);

var api = require('./app/controllers/api');
app.use('/api', api);

var users = require('./app/controllers/users');
app.use('/user', users);

var tasks = require('./app/controllers/tasks');
app.use('/task', tasks);

var admin = require('./app/controllers/admin');
app.use('/admin', admin);

*/

/*
app.use(function(req, res, next) {
  //res.status(404);
  if (res.status(404)) {
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', {
        url: req.url,
        title: 'Not found',
        layout: 'layout'
      });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({
        error: 'Not found'
      });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  }
});
*/
app.listen(PORT);
console.log("Application Running in ", config.appUrl + ':' + PORT);
