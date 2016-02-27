var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var mongoose = require('mongoose');


var Page = mongoose.Schema({
}, { collection: 'pages' });

var model = mongoose.model('Page', Page );

module.exports = model;
