var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');
let Comment = require('../models/comment');

router.get('/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Topic.findById(req.params.id, function(err, topic) {
      Comment.find({
        topic: topic._id
      }, function(err, comments) {
        return res.render("topic", {
          title: "Topic",
          user: user,
          topic: topic,
          comments: comments
        });
      });
    });
  });
});

router.post('/:id/comment', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    var userData = {
      text: req.body.text,
      topic: req.params.id,
      user: user._id,
      date: new Date()
    }
    Comment.create(userData, function(error, user) {
      if (error) {} else {
        res.redirect(req.get('referer'));
      }
    });
  });
});

module.exports = router;
