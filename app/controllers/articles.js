var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Article = mongoose.model('Article');

module.exports = {
  list: function (req, res) {
    Article.find({}, function (err, arts) {
      if (!err) {
        res.render('articles/list',{articles: arts});
      }
    }).populate('user');
  },

  newa: function (req, res) {
    if (req.method == 'POST') {
      req.body.user = req.user.id;
      // PROCESAR TAGS
      delete(req.body.tags);
      // PROCESAR TAGS
      art = new Article (req.body);

      art.save(function (err) {
        if (!err) {
          console.log ('Save ok: '+err);
          res.redirect( '/articles/list');
        }
        else {
          console.log ('Save ok');
          res.redirect( '/articles/new');
        }
      });
    }
    else {
      res.render('articles/new');
    }
  },

  edit: function (req, res) {
    Article.findOne({_id: req.params.articleId}, function (err, art) {
      if (!err) {
        res.render('articles/edit', {article: art});
        console.log(art);
      }
      else {
        console.log ('There no exists article');
      }
    }).populate('user');
  },

  update: function (req, res) {
      // MODIFICAR TAGS
      delete (req.body.tags);
      // MODIFICAR TAGS
     
    Article.update({_id: req.params.articleId}, req.body, function (err) {
      if (!err) {
        console.log ('Article Update success');
        res.redirect('/articles/list');
      }
      else {
        console.log ('Article Update failed: '+err + '\n\n');
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



