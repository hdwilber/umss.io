var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');

var Project = mongoose.Schema({
  title: { type: String },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  name: {type: String},
  desc: {type: String},
  timestamp: {type: Date, default: Date.now()},
  tags: [{type: String}]
}, { collection: 'articles' });

var model = mongoose.model('Project', Project);

module.exports = model;

