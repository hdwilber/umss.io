var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var User = mongoose.Schema({
  name: { type: String },
  email: { type: String},
  type: {type: Number},
  password: {type: String},
  careers: [{type: mongoose.Schema.ObjectId, ref: 'Career'}],
  klasses: [{type: mongoose.Schema.ObjectId, ref: 'Klass'}]

}, { collection: 'users' }); 

User.plugin(passportLocalMongoose);
var model = mongoose.model('User', User);

module.exports = model;
