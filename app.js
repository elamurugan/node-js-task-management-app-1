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
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const _AppPath = PATH.join(__dirname, '/app/');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(config.mongoURI, {
        useMongoClient: true
    })
    .then(() => console.log('DB ' + config.mongoURI + ' Connected'))
    .catch(err => console.log(err));

const app = express();

// var helpers = require('./app/helpers/helpers');

require('./app/models/User');
require('./app/models/Tasks');

// require('./app/helpers/loadModules').requireModules(_AppPath + 'models/');

const User = mongoose.model('users');
const Task = mongoose.model('tasks');

app.engine('handlebars', exphbs({
    extname: 'handlebars',
    defaultLayout: 'app',
    layoutsDir: _AppPath + 'views/layouts',
    partialsDir: _AppPath + 'views/partials'
}));
app.set('view engine', 'handlebars');
app.use(express.static(PATH.join(__dirname, '/public')));
app.set('views', _AppPath + 'views');
app.set('layouts', _AppPath + 'views/layoutss');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(
    cookieSession({
        maxAge: config.cookieExpireTime,
        keys: [config.cookieKey]
    })
);
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const PORT = process.env.PORT || config.defaultPort;
const ctrlPath = _AppPath + 'controllers/';

app.locals.copyright = new Date().getFullYear();
app.locals.appName = config.appName;
app.locals.logo = config.appName.match(/\b(\w)/g).join('');
app.locals.baseUrl = config.appUrl + ':' + PORT;
app.locals.bp = __dirname + '/';

app.use(function(req, res, next) {
    app.locals.user = req.user;
    //console.log('Req Path ', req.path);
    next();
});

require('fs').readdirSync(ctrlPath).forEach(function(file) {
    if (file.match(/.+\.js/g) !== null) {
        require(ctrlPath + file)(app, express, config);
        console.log(ctrlPath + file);
    }
});

require('./app/helpers/passport')(app, passport, config, User);

app.listen(PORT);
console.log("Application Running in ", config.appUrl + ':' + PORT);