var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Project = mongoose.model('Project');

module.exports = {
  list: function (req, res) {
    Project.find({}, function (err, arts) {
      if (!err) {
        res.json (arts);
      }
    }).populate('user');
  },

  newp: function (req, res) {
    if (req.method == 'POST') {
      Project.save(req.body, function (err) {
        if (err) {
          console.log ('Save ok');
          res.redirect( '/');
        }
        else {
          console.log ('Save not ok');
          res.redirect( '/projects/new');
        }
      });
    }
    else {
      res.render('projects/new');
    }
  },

  edit: function (req, res) {
    Project.find({_id: req.params.projectId}, function (err, pro) {
      res.render('projects/edit', {project: pro});
    }).populate('user');
  },

  update: function (req, res) {
    Project.update({_id: 'req.params.projectId'}, req.body, function (err) {
      if (!err) {
        console.log ('Project Update success');
        res.redirect('/projects/list');
      }
      else {
        console.log ('Project Update failed');
        res.redirect('/projects/edit/' + req.params.projectId);
      }
    });
      
  },
  delete: function (req, res) {
    Project.remove ({_id: req.params.projectId}, function (err) {
      if (!err) {
        console.log ('Project Delete success');
      }
      else {
        console.log ('Project Delete failed');
      }
    res.redirect('/projects/list');
    });
  }
};



