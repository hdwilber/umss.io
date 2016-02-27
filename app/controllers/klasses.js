var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Klass = mongoose.model('Klass');

module.exports = {
  list: function (req, res) {
    Klass.find({}, function (err, klasses) {
      if (!err) {
        res.json (klasses);
      }
    });
  },
  listByTime: function (req, res) {
   if (req.method == 'GET') {
     Klass.find ({'start' : {$gt : req.params.start}, 'end': {$lt : req.params.end}}, function (err, kls) {
       if (!err) {
         res.json ({'klasses': kls, 'return': '1', 'info': 'Klasses between '+req.params.start +'-'+req.params.end});
       }
       else {
         res.json ({'return': '0', 'info': 'Something happen', 'error': err});
       }
     });
   }
  },

  myList: function (req, res) {
    if (req.method == 'GET' ){
      Klass.find ({'career': {$in : req.user.careers}, 'start': {$gt: req.params.start}, 'end': {$lt : req.params.end}}, function (err, kls) {
        if (!err) {
          res.json ({'klasses': kls, 'return': '1', 'info': 'Klasses between '+req.params.start +'-'+req.params.end});
        }
        else {
          res.json ({'return': '0', 'info': 'Something happen', 'error': err});
        }
      });
      
    }
  },

  myListPerDay: function (req, res) {
    if (req.method == 'GET' ){
      Klass.find ({'career': {$in : req.user.careers}, 'day': res.params.day, 'start': {$gt: req.params.start}, 'end': {$lt : req.params.end}}, function (err, kls) {
        if (!err) {
          res.json ({'klasses': kls, 'return': '1', 'info': 'Klasses between '+req.params.start +'-'+req.params.end});
        }
        else {
          res.json ({'return': '0', 'info': 'Something happen', 'error': err});
        }
      });
      
    }
  },
  myListPerDayCareer: function (req, res) {
    if (req.method == 'GET' ){
      Klass.find ({'career': req.params.career, 'day': req.params.day, 'start': {$gt: req.params.start}, 'end': {$lt : req.params.end}}, function (err, kls) {
        if (!err) {
          res.json ({'klasses': kls, 'return': '1', 'info': 'Klasses between '+req.params.start +'-'+req.params.end});
        }
        else {
          res.json ({'return': '0', 'info': 'Something happen', 'error': err});
        }
      });
      
    }
  }
};



