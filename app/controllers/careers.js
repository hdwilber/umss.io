var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Career = mongoose.model('Career');

module.exports = {
  list: function (req, res) {
    Career.find({}, function (err, cars) {
      if (!err) {
        res.json (cars);
      }
    });
  },
  myList: function (req,res ){
    Career.find({_id: {$in: req.user.careers}}, function (err, cars) {
      if( !err) {
        res.json ({'return': 0, 'info': 'Your careers', 'careers': cars});
      }
      else {
        res.json ({'return': 0, 'info': 'Something went wrong'});
      }
    });
  }
};



