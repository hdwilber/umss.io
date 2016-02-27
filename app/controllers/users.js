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

  addKlass: function (req, res) {
    User.find({},{_id: req.user._id, 'klasses': {$elemMatch: {$eq: req.params.careerId}}}, function (err, users) {
      console.log(users);
      if (!err) {
        if (users.length == 0) {
          User.update({_id: req.user._id}, {
            $push: {'klasses': req.params.klassId}
              }, function (err) {
                if (!err) {
                  res.json ({'result':'1', 'info': 'Klass Successfully added'});
                }
                else {
                  res.json ({'result': '0', 'info': 'Something went wrong when updating', 'error': err});
                }
              });
        } else {
          res.json ({'result': '0', 'info': 'This Klass already exists in your list'});
        }
      }
      else {
        res.json ({'result': '0', 'info': 'Something went wrong when checking', 'error': err});
      }
    });
  },

  removeCareer: function (req, res) {
    if (req.user.careers.indexOf(req.params.careerId) >= 0) {
      User.update({_id: req.user._id}, {
        $pull: {'careers': req.params.careerId}
          }, function (err) {
            if (!err) {
              res.json ({'result':'1', 'info': 'Career Successfully removed'});
            }
            else {
              res.json ({'result': '0', 'info': 'Something went wrong when updating', 'error': err});
            }
          });
    }
    else {
      res.json ({'result' : '0', 'info': 'This career doesnt exists in your list'});
    }

  },

  addCareer: function (req, res) {
    console.log (req.user);
    if (req.user.careers.indexOf(req.params.careerId) < 0) {
      User.update({_id: req.user._id}, {
        $push: {'careers': req.params.careerId}
          }, function (err) {
            if (!err) {
              res.json ({'result':'1', 'info': 'Career Successfully added'});
            }
            else {
              res.json ({'result': '0', 'info': 'Something went wrong when updating', 'error': err});
            }
          });
  
    }
    else {
      res.json ({'result': '0', 'info': 'This career already exists in your list'});
    }
    //User.find({},{_id: req.user._id,careers: {$in: {$eq: req.params.careerId}}}, function (err, users) {
      //if (!err) {
        //if (users == undefined) {
          //console.log("users.length: " + users.length);
          //User.update({_id: req.user._id}, {
            //$push: {'careers': req.params.careerId}
              //}, function (err) {
                //if (!err) {
                  //res.json ({'return':'1', 'info': 'Career Successfully added'});
                //}
                //else {
                  //res.json ({'return': '0', 'info': 'Something went wrong when updating', 'error': err});
                //}
              //});
        //} else {
          //res.json ({'return': '0', 'info': 'This career already exists in your list'});
        //}
      //}
      //else {
        //res.json ({'return': '0', 'info': 'Something went wrong when checking', 'error': err});
        //console.log ("ERROR: " + err);
      //}
      
    //});
    
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
      res.json ({'_csrf': req.csrfToken(), 'username': "USERNAME", "password": "THEPASSWORD"});
    }
  }

}
