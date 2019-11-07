var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');
let Comment = require('../models/comment');
let Notifications = require('../models/notifications');

router.get('/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Topic.findById(req.params.id, function(err, topic) {
      topic.views = topic.views += 1;
      Comment.find({
        topic: topic._id
      }, function(err, comments) {
        topic.save(function() {
          return res.render("topic", {
            title: "Topic",
            user: user,
            topic: topic,
            comments: comments
          });
        });
      }).sort({
        _id: -1
      });
    });
  });
});

router.get('/edit/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Topic.findById(req.params.id, function(err, topic) {
      if (topic.owner._id.toString() != user._id.toString() && user.account != "admin" && user.account != "superadmin") res.redirect(req.get('referer'));
      return res.render("edit", {
        title: "edit",
        user: user,
        topic: topic
      });
    });
  });
});

router.post('/edit/existing/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
      Topic.findById(req.params.id, function(error, topic) {
          if (user.account == "superadmin" || user._id == topic.owner){

              topic.title = req.body.title;
              if(req.body.body != ""){
              topic.body = req.body.body;
              }

              topic.desc = req.body.desc;

              topic.save(function(s) {
                return res.redirect("/topic/" + topic._id);
              });
        }
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
    Topic.findById(req.params.id, function(err, topic) {
      Comment.create(userData, function(error, comment) {
        var notificationData = {
          title: "New Comment On Your Article",
          type: "interaction",
          message: user.username + " wrote '" + comment.text + "' on your article '" + topic.title + "'",
          redict: "/topic/" + topic._id,
          date: new Date()
        }
        Notifications.create(notificationData, function(error, notification) {
          User.findById(topic.owner, function(err, owner) {
            owner.notifications.push(notification);
            owner.save(function(err) {
              res.redirect(req.get('referer'));
            });
          });
        });
      });
    });
  });
});




router.get('/:id/:opt', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Topic.findById(req.params.id, function(err, topic) {
      if (req.params.opt == "save") {
        user.saved.push(topic._id);
        user.save(function(err) {
          res.redirect(req.get('referer'));
        });
      }
      if (req.params.opt == "unsave") {
        user.saved.pull(topic._id);
        user.save(function(err) {
          res.redirect(req.get('referer'));
        });
      }
    });
  });
});

module.exports = router;
