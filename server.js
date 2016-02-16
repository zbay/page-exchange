'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;

var express = require('express');
var app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var routes = require('./controllers');
var session = require('client-sessions');
var dotenv = require('dotenv').load();

//mongoose.connect('mongodb://localhost:27017/page-exchange', function (err, db)
mongoose.connect(process.env.MONGOLAB_URI, function (err, db)
{
 if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB.');

app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  isLoggedIn: false
}));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

routes.set(app); 

app.listen(process.env.PORT || 8080, function(){
	console.log("The frontend server is running on port 8080.");
}); //listen 8080
}
});