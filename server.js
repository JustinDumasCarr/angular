const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


//Connecting to mongodb database
var db;
var dbUser = 'ConcertConnect';
//Need to escape @ character for the password
var dbPass = 'connect%408717';

MongoClient.connect('mongodb://'+dbUser+':'+dbPass+'@ds141128.mlab.com:41128/test-api', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
});


//Allows the app to parse json date
//Different parameter is needed to parse forms
app.use(bodyParser.json());


//Get that fetches all users ----> Will probably never be used but is useful for testing purposes
app.get('/', (req, res) => {
    db.collection('users').find().toArray(function(err, results)
    {
      //  console.log(results);
        res.send(results);
    })
});


//Sample post request that will register
//Example: send post request with the following body { "username" : "admin", "pass" : "pass123"} and it will be added to the users database
app.post('/users', (req, res) => {
    db.collection('users').insert(req.body, (err, result) =>
    {
        if (err) return console.log(err);
        console.log('saved to database');
        //Redirects to all users to check is registration was successful, delete later
        res.redirect('/');
    })
});

//Post that will be used to authenticate
app.post('/authenticate', (req, res) => {
  db.collection('users').find(req.body).toArray(function(err, results)
{
  //This returns the username and password if found and nothing if it does not
  res.send(results);

  console.log(results);

})

});
