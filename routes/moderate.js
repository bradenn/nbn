var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    var e = {};
    Topic.find(e, function(err, topics) {
      return res.render("moderate", {
        title: "Moderation",
        user: user,
        topics: topics
      });
    }).sort({_id: -1});
  });
});

module.exports = router;
