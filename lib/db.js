var config = require('config');
var MongoClient = require('mongodb').MongoClient;

var dbPass = process.env.DB_PASSWORD || config.get('db.password');

var url = 'mongodb://'+config.get('db.username')+':'+dbPass+'@'+config.get('db.host')+':'+config.get('db.port')+'/'+config.get('db.name');

function getEcoLikes(callback) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Error connecting to MongoDB', err);
      return callback(err);
    }
    console.log("Connected successfully to Mongo server");

    var collection = db.collection('ecotweets');

    collection.find({}).toArray(function(err, docs) {
      db.close();
      if (err) {
        console.log('Error fetching tweets from Mongo', err);
        return callback(err);
      }

      callback(null, docs);
    });
  });
}
exports.getEcoLikes = getEcoLikes;
