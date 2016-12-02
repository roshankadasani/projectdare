var mongoose = require('mongoose');

var dareSchema = mongoose.schema({
  creator: String,
  title: String,
  description: String,
  hashtag: String
});

module.exports = mongoose.model('Dare', dareSchema);