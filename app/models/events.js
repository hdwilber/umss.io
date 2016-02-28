var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');

var Event = mongoose.Schema({
title: { type: String },
user: {type: mongoose.Schema.ObjectId, ref: 'User'},
body: {type: String},
timestamp: {type: Date, default: Date.now()},
tags: [{type: String}]
}, { collection: 'events' });

var model = mongoose.model('Event', Event);

module.exports = model;
