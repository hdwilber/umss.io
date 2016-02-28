var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Page = mongoose.model('Page');
var Article = mongoose.model('Article');
var Event = mongoose.model('Event');
var Project =mongoose.model ('Project');


module.exports = {
  index : function (req, res) {
    Article.find({}, function (err, arts) {
      if (!err) {
        Event.find({}, function (err, evs) {
          if (!err) {
            Project.find({}, function (err, projs) {
              if (!err) {
                res.render('pages/index', {articles: arts, events: evs, projects: projs});
              }
            });
          }
        });
      }
      else {
        console.log ('Something gets wrong');
      }
    });
  }
};



