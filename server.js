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
//Different parameter is need to parse forms
app.use(bodyParser.json());


//Get that would determine if authentication was successful or not
app.get('/', (req, res) => {
    db.collection('users').find().toArray(function(err, results)
    {
      //  console.log(results);
        res.send(results);
    })
});


//Sample post request
app.post('/users', (req, res) => {
    db.collection('users').insert(req.body, (err, result) =>
    {
        if (err) return console.log(err);
        console.log('saved to database');
        res.redirect('/')
    })
});

