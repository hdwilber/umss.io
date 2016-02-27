var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var News = mongoose.model('News');

module.exports = {
  list: function (req, res) {
    News.find({}, function (err, news) {
      if (!err) {
        res.json (news);
      }
    }).populate('user');
  },
  newn: function (req, res) {
    if (req.method == 'POST') {
      News.save(req.body, function (err) {
        if (err) {
          console.log ('Save ok');
          res.redirect( '/');
        }
        else {
          console.log ('Save not ok');
          res.redirect( '/news/new');
        }
      });
    }
    else {
      res.render('news/new');
    }
  },

  edit: function (req, res) {
    News.find({_id: req.params.newsId}, function (err, newsb) {
      res.render('news/edit', {news: newsb});
    }).populate('user');
  },

  update: function (req, res) {
    News.update({_id: 'req.params.newsId'}, req.body, function (err) {
      if (!err) {
        console.log ('News Update success');
        res.redirect('/news/list');
      }
      else {
        console.log ('News Update failed');
        res.redirect('/news/edit/' + req.params.newsId);
      }
    });
      
  },
  delete: function (req, res) {
    News.remove ({_id: req.params.newsId}, function (err) {
      if (!err) {
        console.log ('News Delete success');
      }
      else {
        console.log ('News  Delete failed');
      }
    res.redirect('/news/list');
    });
  }
};




