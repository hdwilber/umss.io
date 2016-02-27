var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');


var Noveltie = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  klass: {type: mongoose.Schema.ObjectId, ref: 'Klass'},
  date: { type: Date, default: Date.now()},
  dateTarget: {type: Date},
  type: {type: Number},
  desc: {type: String}

}, { collection: 'novelties' });

var model = mongoose.model('Noveltie', Noveltie );

module.exports = model;
