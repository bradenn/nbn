var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    User.find({}, function(err, users) {
      User.findOne({
        username: req.query.target
      }, function(err, target) {
        var e = {};
        Topic.find(e, function(err, topics) {
          return res.render("admin", {
            title: "Admin",
            user: user,
            users: users,
            target: target,
            topics: topics
          });
        }).sort({_id: -1});
      });
    });
  });
});

router.post('/account/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    User.findById(req.params.id, function(err, target) {
      if (user.account.toString() == "admin" || user.account.toString() == "superadmin") {
        target.account = req.body.type;
        target.save(function(err) {
          res.redirect(req.get('referer'));
        });
      }

    });
  });
});

module.exports = router;
