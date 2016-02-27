var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Page = mongoose.model('Page');
var Article = mongoose.model('Article');
var News = mongoose.model('News');


module.exports = {
  index : function (req, res) {
    Article.find({}, function (err, arts) {
      if (!err) {
        News.find({}, function (err, newsb) {
          if (!err) {
            res.render('pages/index', {articles: arts, news: newsb});
          }
        });
      }
      else {
        console.log ('Something gets wrong');
      }
    });
    res.render('pages/index');

  }
};



