var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Klass = mongoose.model ('Klass');
var Noveltie = mongoose.model ('Noveltie');

module.exports = {

  list: function (req, res) {
    Noveltie.find({}, function (err, novs) {
      if (!err) {
        res.json ({'return': '1', 'info':'List of novelties', novelties: novs});
      }
    }).populate('user').populate('klass');
  },
  add: function (req, res) {
    if (req.method == 'POST'){
      req.body.user = req.user.id;
      req.body.dateTarget= new Date(req.body.dateTarget);
      //console.log (req.body);

      var nov = new Noveltie(req.body);
      console.log(nov);

      nov.save(function (err) {
        if (!err) 
        {
          res.json ({'info': 'The noveltie was added succesffully', 'return': '1'});
        } else {
          res.json ({'return': '0'});
        }
        return;
      });
    }
  },
  delete: function (req, res) {
    Noveltie.remove({_id: req.params.noveltieId}, function (err) {
      if (!err) {
          res.json ({'info': 'The noveltie was deleted succesffully', 'return': '1'});
      }
      else {
          res.json ({'return': '0'});
      }
   });
  },
  update: function (req, res) {

    Noveltie.update({_id: req.params.noveltieId}, {'desc': req.body.desc, 'dateTarget': req.body.dateTarget}, function (err) {
      if (!err) {
          res.json ({'info': 'The noveltie was updated succesffully', 'return': '1'});
      }
      else {
          res.json ({'return': '0'});
      }
    });

  }
}
