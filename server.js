/**
 * Created by user on 2017-01-31.
 */
var cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('express-cors');
var logger = require('morgan');

//this is where the get and post api shit is
var routes = require('./routes/index');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
//ADDING ACCESS CONTROL FOR EASIER TESTING, MAKE SURE THIS INFOR IS CORRECT BEFORE DEPLOYMENT
app.use(cors({
  allowedOrigins: [
    'localhost:4200'
  ]
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
var dbUser = 'ConcertConnect';
// //Need to escape @ character for the password
var dbPass = 'connect%408717';
//mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');
mongoose.connect('mongodb://'+dbUser+':'+dbPass+'@ds141128.mlab.com:41128/test-api');


// //Connecting to mongodb database
// var db;
//
// MongoClient.connect('mongodb://'+dbUser+':'+dbPass+'@ds141128.mlab.com:41128/test-api', (err, database) => {
//   if (err) return console.log(err);
// db = database;
// app.listen(3000, () => {
//   console.log('listening on 3000')
// })
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});


module.exports = app;



//
// //Get that fetches all users ----> Will probably never be used but is useful for testing purposes
// app.get('/', (req, res) => {
//   db.collection('users').find().toArray(function(err, results)
// {
//   //  console.log(results);
//   res.send(results);
// })
// });
//
//
// //Sample post request that will register
// //Example: send post request with the following body { "username" : "admin", "password" : "pass123"} and it will be added to the users database
// app.post('/users', (req, res) => {
//   db.collection('users').insert(req.body, (err, result) =>
// {
//   if (err) return console.log(err);
// console.log('saved to database');
//
// //Redirects to all users to check is registration was successful, delete later
// //res.redirect('/');
// })
// });
//
// //Post that will be used to authenticate
// app.post('/authenticate', (req, res) => {
//   db.collection('users').find(req.body).toArray(function(err, results)
// {
//   //If is empty returns false
//   if(results == undefined || results.length==0)
//   {
//     results.push({name: "authentication", value: "false"});
//   }
//   //If there's data then returns true
//   else
//   {
//     //Emptying the array so it does not return the user information
//     results = [];
//     results.push({name: "authentication",value:"true"});
//   }
//   res.send(results);
//
// })
//
// });
