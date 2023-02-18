var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./connection')

var indexRouter = require('./routes/index');
var formRouter = require('./routes/form');

var app = express();
var hbs = require("hbs")

hbs.registerHelper('getTable', (data) => {
  let table = "";
  for(let i = 0; i < data.length; i++) {
    table += "<tr>"
    table += `<td>${data[i].firstName}</td>`
    table += `<td>${data[i].lastName}</td>`
    table += `<td>${data[i].department}</td>`
    table += `<td>${data[i].startDate.toLocaleString()}</td>`
    table += `<td>${data[i].jobTitle}</td>`
    table += `<td>${data[i].salary}</td>`
    table += `<td><a href="/addEmployee/${data[i]._id}">Update Employee</td>`
    table += `<td><a href="/delete/${data[i]._id}">Delete Employee</td>`
    table += "</tr>"
  }
  return table
});

hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/addEmployee', formRouter);

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