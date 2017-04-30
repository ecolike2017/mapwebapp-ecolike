var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://u:p@ds111718.mlab.com:11718/eco-likes-2017';

function getEcoLikes(callback) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
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
