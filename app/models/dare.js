var mongoose = require('mongoose');

var dareSchema = mongoose.Schema({
  creator: String,
  title: String,
  description: String,
  hashtag: String
});

module.exports = mongoose.model('Dare', dareSchema);
