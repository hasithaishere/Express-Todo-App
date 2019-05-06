const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const config = require('./config'); // get our config file

const index = require('./routes/index');
const api = require('./routes/api');
const management = require('./routes/management');

const middleware = require('./lib/helpers/middleware');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// Management routes no need to authenticate
app.use('/mgt', management);

// Add middleware modules to enhance the functionality of routes
app.use(middleware.authCheck); // Add middleware for single point authentication

// Routes with authentications - HTML files and api
app.use('/', index); // Routes for HTML pages
app.use('/api', api); // Routes for api

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.render('404');
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
