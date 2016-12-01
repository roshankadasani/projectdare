//server file
var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    configDB = require('./config/database.js');

//database mlab connection
mongoose.connect('mongodb://cpsc473:webdev@ds053146.mlab.com:53146/473projects');

//passport config file
//require('.config/passport')(passport);

//logs every request to console
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'secretkey'}));
app.use(passport.initialize());
app.use(passport.session());

//An area of the session used for storing messages.
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('listening at port ' + port);
