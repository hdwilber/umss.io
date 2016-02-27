var path = require('path');
var app = require(path.join(process.cwd(), 'app'));
var User = require(path.join(process.cwd(), 'app', 'models', path.basename(__filename)));
var passport = require('passport');

module.exports = {
  list: function (req, res) {
    User.find ({}, function (err, users) {
      if (err) {
      }
      console.log ("GET Users");
      res.json(users);
    });
  },

  check: function (req, res) {
    if (req.method == "POST") {

      User.findOne({username: req.body.username}, function (err, user) {
        if (user != undefined){
          return res.json ({"result": "1", "info": "User exists"});
        }
        else {
          return res.json ({"result": "0", "info": "Not exists this user"});
        }
      });
    }
  },

  register: function (req, res) {
    if (req.method == 'POST') {
      User.register(new User({username: req.body.username}),
        req.body.password, function (err, user) {
          if (err) {
            return res.json({info: "Sorry. That username already exists. Try again"});
          }
        passport.authenticate('local')(req, res, function() {
          req.session.save(function (err) {
            if (err) {
              return next(err);
            }
            return res.json({info: "User registed successfully"});
          });
        });
      });
    }
    else {
      res.render ('users/register', {});
    }
  }

}
