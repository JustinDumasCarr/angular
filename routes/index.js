/**
 * Created by Justin on 2017-01-18.
 */

const routes = require('express').Router();
const models = require('../../models');
var express = require('express');
var passport = require('passport');

routes.use('/models', models);



//Get that fetches all users ----> Will probably never be used but is useful for testing purposes
routes.get('/', (req, res) => {
  db.collection('users').find().toArray(function(err, results)
{
  //  console.log(results);
  res.send(results);
})
});


//Sample post request that will register
//Example: send post request with the following body { "username" : "admin", "password" : "pass123"} and it will be added to the users database
routes.post('/users', (req, res) => {
  db.collection('users').insert(req.body, (err, result) =>
{
  if (err) return console.log(err);
console.log('saved to database');

//Redirects to all users to check is registration was successful, delete later
//res.redirect('/');
})
});

//Post that will be used to authenticate
routes.post('/authenticate', (req, res) => {
  db.collection('users').find(req.body).toArray(function(err, results)
{
  //If is empty returns false
  if(results == undefined || results.length==0)
  {
    results.push({name: "authentication", value: "false"});
  }
  //If there's data then returns true
  else
  {
    //Emptying the array so it does not return the user information
    results = [];
    results.push({name: "authentication",value:"true"});
  }
  res.send(results);

})



module.exports = routes;
