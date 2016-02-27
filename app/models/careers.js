var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');

var Career = mongoose.Schema({
  name: { type: String }

}, { collection: 'careers' });

var model = mongoose.model('Career', Career);

module.exports = model;
