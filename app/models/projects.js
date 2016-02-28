var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');

var Project = mongoose.Schema({
  title: { type: String },
  creator: {type: mongoose.Schema.ObjectId, ref: 'User'},
  user: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  name: {type: String},
  desc: {type: String},
  timestamp: {type: Date, default: Date.now()},
}, { collection: 'projects' });

var model = mongoose.model('Project', Project);

module.exports = model;

