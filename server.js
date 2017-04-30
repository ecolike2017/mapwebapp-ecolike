
var express = require('express');
var app = express();
var config = require('config');
var db = require('./lib/db');

app.set('view engine', 'ejs');
app.use('/static', express.static('static'));


// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

//
// AJAX endpoints
//
app.get('/api/ecolikes', function(req, res) {
  db.getEcoLikes(function(err, docs) {
    if (err) {
      return res.status(500).json({message: 'Error fetching data from DB'});
    }

    res.status(200).json(docs);
  });
});

app.listen(config.get('server.port'));
console.log('%s is the magic port', config.get('server.port'));
