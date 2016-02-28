var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');

var Article = mongoose.Schema({
  title: { type: String },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  body: {type: String},
  timestamp: {type: Date, default: Date.now()},
  tags: {type: mongoose.Schema.ObjectId, ref: 'Tag'},
}, { collection: 'articles' });

var model = mongoose.model('Article', Article);

module.exports = model;

