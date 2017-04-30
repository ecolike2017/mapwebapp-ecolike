
var express = require('express');
var app = express();
var db = require('./lib/db');

app.set('view engine', 'ejs');

app.use('/static', express.static('static'));


// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/api/ecolikes', function(req, res) {
  db.getEcoLikes(function(err, docs) {
    if (err) {
      return res.status(500).json({message: 'Error fetching data from DB'});
    }

    res.status(200).json(docs);
  });
  // var ecolikes = {
  //   ecolikes: [
  //     {
  //       foo: 'bar'
  //     },
  //     {
  //       foo: 'baz'
  //     }
  //   ]
  // }
  // res.status(200).json(ecolikes);
});

// about page
// app.get('/about', function(req, res) {
//     res.render('pages/about');
// });

app.listen(8080);
console.log('8080 is the magic port');
