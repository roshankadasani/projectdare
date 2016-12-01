//server file
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var mongo = require('mongodb');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

//database mlab connection
mongoose.connect(configDB.url);

//passport config file
require('./config/passport')(passport);

//logs every request to console
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//An area of the session used for storing messages.
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('\n');
console.log('listening on port ' + port + '\n');
console.log('Do not use localhost:3000/ use 127.0.0.1:3000/ as twitter does not authenticate localhost urls');
