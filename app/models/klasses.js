var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var Klass = mongoose.Schema({

  name: { type: String },
  code: { type: String},
  classroom: { type: String},
  career: {type: mongoose.Schema.ObjectId, ref: 'Career'},
  professor: {type: String},
  day: {type: String},
  start: {type: Number},
  end: {type: Number},
  level: {type: String}

}, { collection: 'klasses' });


var model = mongoose.model('Klass', Klass);

module.exports = model;
