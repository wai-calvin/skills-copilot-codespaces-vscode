// Create web server application
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// Set the port number
app.set('port', process.env.PORT || 3000);

// Set the path to the static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the path to the views
app.set('views', __dirname + '/views');

// Set the view engine
app.set('view engine', 'ejs');

// Set the path to the body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set the path to the JSON file
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

// Set the path to the GET request
app.get('/', function(req, res) {
  res.render('index');
});

// Set the path to the POST request
app.post('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // Set the variable to the data
    var comments = JSON.parse(data);

    // Set the variable to the date
    var date = new Date();

    // Set the variable to the new comment
    var newComment = {
      id: date.getTime(),