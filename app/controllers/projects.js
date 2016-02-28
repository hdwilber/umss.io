var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Project = mongoose.model('Project');

module.exports = {
  list: function (req, res) {
    Project.find({}, function (err, projs) {
      if (!err) {
        res.render('projects/list',{projects: projs});
      }
    }).populate('creator');
  },

  newp: function (req, res) {
    if (req.method == 'POST') {
      proj = new Project(req.body);
      proj.save(function (err) {
        if (!err) {
          console.log ('Save ok');
          res.redirect( '/projects/list');
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
    Project.findOne({_id: req.params.projectId}, function (err, pro) {
      if (!err) {
        res.render('projects/edit', {project: pro});
      }
    }).populate('user');
  },

  update: function (req, res) {
    Project.update({_id: req.params.projectId}, req.body, function (err) {
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



