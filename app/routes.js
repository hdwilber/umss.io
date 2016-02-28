var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var fs = require('fs');
var glob = require('glob');
var passport = require('passport');
var auth = require('./middlewares/authorization');

var controllers = {};
var files = glob.sync(path.join(process.cwd(), 'app', 'controllers', '**', '*.js'));
files.forEach(function(file) {
  var temp = controllers;
  var parts = path.relative(path.join(process.cwd(), 'app', 'controllers'), file).slice(0, -3).split(path.sep);

  while (parts.length) {
    if (parts.length === 1) {
      temp[parts[0]] = require(file);
    } else {
      temp[parts[0]] = temp[parts[0]] || {};
    }
    temp = temp[parts.shift()];
  }
});

module.exports = function() {

  app.route('/').get(controllers.pages.index);
  app.route('/users/list').get(controllers.users.list);
  app.route('/users/register').post(controllers.users.register);
  app.route('/users/register').get(controllers.users.register);
  app.route('/users/check').post(controllers.users.check);
  app.route('/users/me').get(function (req, res, next) { res.json(req.session); return next;});

  // Articles 
  app.route('/articles/list').get(auth.requiresLogin, controllers.articles.list);
  app.route('/articles/new').get(auth.requiresLogin, controllers.articles.newa);
  app.route('/articles/new').post(auth.requiresLogin, controllers.articles.newa);
  app.route('/articles/edit/:articleId').get(auth.requiresLogin, controllers.articles.edit);
  app.route('/articles/update/:articleId').post(auth.requiresLogin, controllers.articles.update);
  app.route('/articles/delete/:articleId').post(auth.requiresLogin, controllers.articles.delete);

  // News
  app.route('/events/list').get(controllers.events.list);
  app.route('/events/new').get(controllers.events.newn);
  app.route('/events/new').post(controllers.events.newn);
  app.route('/events/edit/:eventId').get(controllers.events.edit);
  app.route('/events/update/:eventId').post(controllers.events.update);
  app.route('/events/delete/:eventId').post(controllers.events.delete);

  app.route('/projects/list').get(controllers.projects.list);
  app.route('/projects/new').get(controllers.projects.newp);
  app.route('/projects/new').post(controllers.projects.newp);
  app.route('/projects/edit/:projectId').get(controllers.projects.edit);
  app.route('/projects/update/:projectId').post(controllers.projects.update);
  app.route('/projects/delete/:projectId').post(controllers.projects.delete);

  app.route('/users/login').get(function (req, res, next) {
    res.render('users/login',{});
  });

  app.route('/users/login').post(function(req, res, next) { console.log(req.body); next();}, passport.authenticate('local'),function (req, res, next) {
    console.log (req.body);
    req.session.save (function (err) {
      if (err) {
        console.log (err);
        return next(err);
      }
      else {
        res.redirect('/');
      }
    });
  });

  app.route('/').get(controllers.pages.index);

  app.route('/users/logout').get( function (req, res, next) {
    req.logout();
    req.session.save(function (err) {
      if (err) {
        res.json ({'result': '0', 'info': 'Something happen'});
        return next(err);
      }
      else {
        res.json ({'result': '1', 'info': 'Logout Successfull'});
      }
    });
  });


  app.use(function(err, req, res, next) {
    console.error(err.stack);
    return res.status(500).render('500');
  });

  app.use(function(req, res) {
    return res.status(404).render('404');
  });
}
