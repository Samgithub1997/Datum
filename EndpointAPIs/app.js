// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

// Imported Models
const Summary = require("./models/summary");
const infoBookmark = require("./models/infoBookmark");
const Dishes = require("./models/dishes");

// Imported Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var dishRouter = require("./routes/dishRouter");
var summaryRouter = require("./routes/summaryRouter");
var infoBookmarkRouter = require("./routes/infoBookmarkRouter");
// By me

// define an express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MY code
const url = "mongodb://localhost:27017/datumDb1";
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected to Mongo server.....");
}, (err) => console.log(err));

// ends here

// Routers put to use
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/dishes", dishRouter);
app.use("/summary", summaryRouter);
app.use("/infoBookmarks", infoBookmarkRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
