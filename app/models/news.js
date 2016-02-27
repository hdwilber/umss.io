var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');

var News = mongoose.Schema({
title: { type: String },
User: {type: mongoose.Schema.ObjectId, ref: 'User'},
timestamp: {type: Date, default: Date.now()},
tags: [{type: String}]
}, { collection: 'news' });

var model = mongoose.model('News', News);

module.exports = model;
