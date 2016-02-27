var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Page = mongoose.model('Page');

module.exports = {
  index : function (req, res) {
  res.set('Content-Type', 'text/html');
    res.render ("pages/index");

  }
};



