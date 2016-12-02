var mongoose = require('mongoose');

var DareSchema = mongoose.Schema({
  creator: String,
  title: String,
  description: String,
  hashtag: String
});

module.exports = mongoose.model('Dare', DareSchema);
