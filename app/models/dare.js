var mongoose = require('mongoose');

var DareSchema = mongoose.Schema({
  creator: String,
  title: String,
  description: String,
  hashtag: String
});

var Dare = module.exports = mongoose.model('Dare', DareSchema);

Dare.saveDare = function(username, title, description, callback) {
  var dare = new Dare();

  dare.creator = username;
  dare.title = title;
  dare.description = description;

  /* get hashtag by first getting the count of dares,
     adding 1000 to it, and finally converting it 
     to a hexadecimal string */
  Dare.count(function (err, count) {
    if (err) { console.log(err); }
    else {
      dare.hashtag = (count + 1000).toString(16);

      dare.save(function (err) {
        if (err) 
          callback(err);
        else
          callback('New dare saved\n' + dare);
      });
    }
  });
}