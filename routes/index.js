/**
 * Created by Justin on 2017-01-18.
 */

var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
  var test = JSON.stringify({ x: 5, y: 6 });
  res.send(test)
  console.log("get")

});

router.get('/register', function(req, res) {

});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      console.log("post to /register error")
    }

    passport.authenticate('local')(req, res, function () {
      console.log("post to /register worked")
    });
  });
});

router.get('/login', function(req, res) {
  //res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  //res.redirect('/');
});

router.get('/logout', function(req, res) {
 // req.logout();
 // res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});



module.exports = router;
