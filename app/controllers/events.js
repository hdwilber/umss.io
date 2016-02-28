var path = require('path');
var mongoose = require('mongoose');
var app = require(path.join(process.cwd(), 'app'));
var Event = mongoose.model('Event');

module.exports = {
  list: function (req, res) {
    Event.find({}, function (err, evs) {
      if (!err) {
        res.render('events/list', {events: evs});
      }
    }).populate('user');
  },
  newn: function (req, res) {
    if (req.method == 'POST') {
      // PROCESAR TAGS
      delete(req.body.tags);
      // PROCESAR TAGS
      //
      req.body.user = req.user.id;
      ev = new Event(req.body);

      ev.save(function (err) {
        if (!err) {
          console.log ('Save ok');
          res.redirect( '/events/list');
        }
        else {
          console.log ('Save not ok');
          res.redirect( '/events/new');
        }
      });
    }
    else {
      res.render('events/new');
    }
  },

  edit: function (req, res) {
    Event.findOne({_id: req.params.eventId}, function (err, ev) {
      if (!err) {
        res.render('events/edit', {event: ev});
      }
      else {
        console.log ('There no exists event');
      }
    }).populate('user');
  },

  update: function (req, res) {
      // MODIFICAR TAGS
      delete (req.body.tags);
      // MODIFICAR TAGS

    Event.update({_id: req.params.eventId}, req.body, function (err) {
      if (!err) {
        console.log ('Event Update success');
        res.redirect('/events/list');
      }
      else {
        console.log ('Event Update failed');
        res.redirect('/events/edit/' + req.params.eventId);
      }
    });
      
  },
  delete: function (req, res) {
    Event.remove ({_id: req.params.eventId}, function (err) {
      if (!err) {
        console.log ('Event Delete success');
      }
      else {
        console.log ('Event  Delete failed');
      }
    res.redirect('/events/list');
    });
  }
};




