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
  app.route('/users/list').get(controllers.users.list);
  app.route('/users/register').post(controllers.users.register);
  app.route('/users/check').post(controllers.users.check);
  app.route('/users/me').get(function (req, res, next) { res.json(req.session); return next;});
  app.route('/users/addCareer/:careerId').post(auth.requiresLogin, controllers.users.addCareer);
  app.route('/users/removeCareer/:careerId').post(auth.requiresLogin, controllers.users.removeCareer);
  app.route('/users/addKlass/:klassId').post(auth.requiresLogin, controllers.users.addKlass);

  app.route('/users/login').get(function (req, res, next) {
    res.json ({'_csrf': res.locals.csrf_token, 'username': "USERNAME", "password": "THEPASSWORD"});
  });
  app.route('/users/login').post(function(req, res, next) { console.log(req.body); next();}, passport.authenticate('local'),function (req, res, next) {
    console.log (req.body);
    req.session.save (function (err) {
      if (err) {
        return next(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.json({'result': '1', info: 'Login: Ok'});
    });
  });


  app.route('/klasses/list').get(controllers.klasses.list);
  app.route('/klasses/list/:start/:end').get(controllers.klasses.listByTime);
  app.route('/klasses/myList/:start/:end').get(controllers.klasses.myList);
  app.route('/klasses/myList/:day/:start/:end').get(controllers.klasses.myListPerDay);
  app.route('/klasses/myList/:career/:day/:start/:end').get(controllers.klasses.myListPerDayCareer);
  app.route('/careers/list').get(controllers.careers.list);
  app.route('/careers/myList').get(controllers.careers.myList);

  app.route('/novelties/add').post(auth.requiresLogin, controllers.novelties.add);
  app.route('/novelties/list').get(controllers.novelties.list);
  app.route('/novelties/edit/:noveltieId').put(controllers.novelties.update);
  app.route('/novelties/remove/:noveltieId').delete(auth.requiresLogin, controllers.novelties.delete);

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
