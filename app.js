var express = require('express');
var fs = require('fs');
var path = require('path');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;
var csrf = require('csurf');

var app = express();

app.set('settings', require(path.join(process.cwd(), 'app', 'config')));

var mongoose = require('mongoose');

var connection_string = '127.0.0.1:27017/wtf';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
//mongoose.connect('mongodb://' + app.get('settings').database.domain + '/' + app.get('settings').database.name);

mongoose.connect(connection_string);

app.set('views', path.join(process.cwd(), 'app', 'views'));
app.set('view engine', 'jade');
//app.set('view engine', 'ejs');


app.use(express.static(path.join(process.cwd(), 'public')));
app.use(require('serve-favicon')(path.join(process.cwd(), 'public', 'favicon.ico')));
app.use(require('morgan')('combined'));
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(require('cookie-parser')());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));


var User =require('./app/models/users');

app.use(passport.initialize());
app.use(passport.session());

//app.use(function (req, res, next) {
    //console.log('Time: %d', Date.now());
  //next();
//});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.locals.settings = app.get('settings');

if (app.get('settings').env == 'development') {
  app.use(require('errorhandler')());
  app.locals.pretty = true;
}

//app.use(csrf());
//app.use(function (req, res, next) {
//res.locals.csrf_token = req.csrfToken();
//next();
//});

module.exports = app;

// Load Models

fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js') && !~file.indexOf('.swp')) require(__dirname + '/app/models/' + file);
});


require(path.join(process.cwd(), 'app', 'routes'))();

app.listen(app.get('settings').port, app.get('settings').ip_address, function () {
    console.log( "Listening on " + app.get('settings').ip_address + ", server_port " + app.get('settings').port )
});
