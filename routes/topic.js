var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');
let Comment = require('../models/comment');

router.get('/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Topic.findById(req.params.id, function(err, topic) {
      topic.views = topic.views+=1;
      Comment.find({
        topic: topic._id
      }, function(err, comments) {
        topic.save(function(){
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

router.get('/:id/:opt', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Topic.findById(req.params.id, function(err, topic) {
      if(req.params.opt == "save"){
        user.saved.push(topic._id);
        user.save(function(err){
          res.redirect(req.get('referer'));
        });
      }
      if(req.params.opt == "unsave"){
        user.saved.pull(topic._id);
        user.save(function(err){
          res.redirect(req.get('referer'));
        });
      }
    });
  });
});

module.exports = router;
