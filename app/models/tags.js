var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');

var Tag = mongoose.Schema({
name: { type: String },
}, { collection: 'tags' });

var model = mongoose.model('Tag', Tag);

module.exports = model;
