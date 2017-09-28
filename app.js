//Load environment variables
require('dotenv').load();

var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var settlementTypes = require('./routes/settlementTypes')
var settlements = require('./routes/settlements')
var promotions = require('./routes/promotions')

var bootstrap = require('./models/bootstrap')

var app = express();

//Check if the database is already created and sync it. If it doesn't exist, then create it.
//CAUTION: using { force: true } will drop all the tables and recreate them. Use carefully.
bootstrap.load()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public/images/users')));
app.use(express.static('views'));
app.use(fileUpload());

app.use('/', index);
app.use('/users', users);
app.use('/settlementTypes', settlementTypes)
app.use('/settlements', settlements)
app.use('/promotions', promotions)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
