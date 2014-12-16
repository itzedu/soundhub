var mongoose = require('mongoose');
var SongSchema = new mongoose.Schema({
  	track:  String,
  	artist:  String,
  	file_source: String,
  	date: { type: Date, default: Date.now },
  	hidden: Boolean,
});

mongoose.model('Song', SongSchema);