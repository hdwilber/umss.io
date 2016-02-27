var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Article = mongoose.model('Article');

module.exports = {
  list: function (req, res) {
    Article.find({}, function (err, arts) {
      if (!err) {
        res.json (arts);
      }
    }).populate('user');
  },

  newa: function (req, res) {
    if (req.method == 'POST') {
      Article.save(req.body, function (err) {
        if (err) {
          console.log ('Save ok');
          res.redirect( '/');
        }
        else {
          console.log ('Save not ok');
          res.redirect( '/articles/new');
        }
      });
    }
    else {
      res.render('articles/new');
    }
  },

  edit: function (req, res) {
    Article.find({_id: req.params.articleId}, function (err, art) {
      res.render('articles/edit', {article: art});
    }).populate('user');
  },

  update: function (req, res) {
    Article.update({_id: 'req.params.articleId'}, req.body, function (err) {
      if (!err) {
        console.log ('Article Update success');
        res.redirect('/articles/list');
      }
      else {
        console.log ('Article Update failed');
        res.redirect('/articles/edit/' + req.params.articleId);
      }
    });
      
      
  },
  delete: function (req, res) {
    Article.remove ({_id: req.params.articleId}, function (err) {
      if (!err) {
        console.log ('Article Delete success');
      }
      else {
        console.log ('Article Delete failed');
      }
    res.redirect('/articles/list');
    });
  }
};



